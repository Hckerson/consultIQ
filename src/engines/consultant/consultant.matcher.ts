import { Injectable } from "@nestjs/common";
import { SkillSet } from "@/common/types/types";
import { skillSetKeywords } from "@/common/data/determinants";
import { PrismaService } from "@/services/database/prisma.service";
import { Lead, LeadBlocker } from "src/common/interfaces/lead.interface";
import { idealConsultantSuccessRate } from "@/common/data/weights";
import {
  Consultant,
  ConsultantExperience,
} from "@/common/interfaces/consultant.interface";

@Injectable()
export class ConsultantMatchingEngine {
  constructor(private readonly prisma: PrismaService) {}

  private extractRequiredSkillSets(blockers: LeadBlocker): SkillSet[] {
    const requiredSkills = new Set<SkillSet>();
    const blockerTexts = [
      ...blockers.needs,
      ...blockers.problems,
      ...blockers.situation,
    ];

    for (const [skillSet, keywords] of Object.entries(skillSetKeywords)) {
      for (const keyword of keywords) {
        if (
          blockerTexts.some((text) =>
            text.toLowerCase().includes(keyword.toLowerCase()),
          )
        ) {
          requiredSkills.add(skillSet as SkillSet);
        }
      }
    }

    return Array.from(requiredSkills);
  }

  async matchConsultant(lead: Lead) {
    const { clientInfo, blockers } = lead;

    const requiredSkillSets = this.extractRequiredSkillSets(blockers);

    const foundConsultants = await this.prisma.consultant.findMany({
      where: {
        AND: [
          {
            successRate: {
              gte: idealConsultantSuccessRate * 100,
            },
          },
          {
            OR: [
              {
                qualification: {
                  path: ["specialization", "title"],
                  equals: requiredSkillSets,
                  mode: "insensitive",
                },
              },
              {
                qualification: {
                  path: ["otherQualifications"],
                  array_contains: [{ title: requiredSkillSets }],
                },
              },
            ],
          },
        ],
      },
      include: {
        user: true,
      },
    });

    const finalMatch = [];

    // check  later for time constraints
    const bestMatch = foundConsultants.filter((consultant) => {
      const c = consultant.qualification as unknown as ConsultantExperience;
      return c.specialization.title === clientInfo.industry;
    });

    finalMatch.push(bestMatch);
    if (bestMatch.length < 1 || bestMatch.length === 0) {
      const alternatives = foundConsultants.filter((consultant) => {
        const c = consultant.qualification as unknown as ConsultantExperience;
        return c.specialization.title === clientInfo.industry;
      });
      finalMatch.push(alternatives);
    }
    
    return {
      requiredSkillSets,
      finalMatch,
    };
  }
}
