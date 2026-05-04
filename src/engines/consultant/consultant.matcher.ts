import { Injectable } from "@nestjs/common";
import { SkillSet } from "@/common/types/types";
import { skillSetKeywords } from "@/common/data/determinants.data";
import { PrismaService } from "@/common/database/prisma.service";
import { idealConsultantSuccessRate } from "@/common/data/weights.data";
import { Lead, LeadBlocker } from "src/common/interfaces/lead.interface";

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

  // check  later for time constraints
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
                  specialization: {
                    title: clientInfo.industry,
                  },
                },
              },
              {
                qualification: {
                  otherQualifications: {
                    some: {
                      title: clientInfo.industry,
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      include: {
        user: true,
        qualification: {
          include: {
            specialization: {
              select: {
                title: true,
              },
            },
            otherQualifications: {
              select: {
                title: true,
              },
            },
          },
        },
        skillSet: true,
        bookings: true,
      },
    });

    const subFinalMatch = [];

    const bestMatch = foundConsultants.filter(
      (consultant) => consultant.qualification?.specialization?.title,
    );

    subFinalMatch.push(...bestMatch);

    if (!subFinalMatch.length || subFinalMatch.length === 0) {
      const alternatives = foundConsultants.filter(
        (c) => !bestMatch.includes(c),
      );
      subFinalMatch.push(...alternatives);
    }

    const finalMatch = subFinalMatch.filter((f) =>
      f.skillSet.some((s) => requiredSkillSets.includes(s.name)),
    );

    return {
      requiredSkillSets,
      subFinalMatch,
      finalMatch,
    };
  }
}
