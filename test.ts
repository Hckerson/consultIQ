import { Injectable } from "@nestjs/common";
import { SkillSet } from "@/common/types/types";
import { skillSetKeywords } from "@/common/data/determinants.data";
import { PrismaService } from "@/common/database/prisma.service";
import { Lead, LeadBlocker } from "src/common/interfaces/lead.interface";
import { idealConsultantSuccessRate } from "@/common/data/weights.data";

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

    const where: any = {
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
                equals: clientInfo.industry,
              },
            },
            {
              qualification: {
                path: ["specialization", "niche"],
                equals: clientInfo.niche,
              },
            },
          ],
        },
      ],
    };

    // If we have specific skills required from blockers, add them to the filter
    if (requiredSkillSets.length > 0) {
      where.AND.push({
        OR: requiredSkillSets.map((skill) => ({
          // We check if any of the other qualifications match the required skill
          qualification: {
            path: ["otherQualifications"],
            array_contains: [{ title: skill }],
          },
        })),
      });
    }

    const availableConsultants = await this.prisma.consultant.findMany({
      where,
      include: {
        user: true,
      },
    });

    return {
      requiredSkillSets,
      availableConsultants,
    };
  }
}
