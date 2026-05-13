import { Injectable } from "@nestjs/common";
import { Prisma, SkillSet } from "generated/prisma/client";
import { skillSetKeywords } from "@/common/data/determinants.data";
import { PrismaService } from "@/common/database/prisma.service";
import { idealConsultantSuccessRate } from "@/common/data/weights.data";
import { Lead, LeadBlocker } from "src/common/interfaces/lead.interface";

export type MatchedConsultant = Prisma.ConsultantGetPayload<{
  include: {
    user: true;
    qualification: {
      include: {
        specialization: {
          select: {
            title: true;
          };
        };
        otherQualifications: {
          select: {
            title: true;
          };
        };
      };
    };
    skillSet: true;
    bookings: true;
  };
}>;

export interface ConsultantMatchResult {
  match: MatchedConsultant[];
  requiredSkillSet: SkillSet[];
  alternatives?: MatchedConsultant[];
}

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

  async matchConsultant(lead: Lead): Promise<ConsultantMatchResult> {
    const { clientInfo, blockers } = lead;

    const requiredSkillSet = this.extractRequiredSkillSets(blockers);

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

    const match = foundConsultants.filter(
      (consultant) => consultant.qualification?.specialization?.title,
    );

    subFinalMatch.push(...match);

    const alternatives = foundConsultants.filter((c) => !match.includes(c));

    const noRoleExpert = !subFinalMatch.length || subFinalMatch.length === 0;

    if (noRoleExpert) {
      subFinalMatch.push(...alternatives);
    }

    const bestMatch = subFinalMatch.filter((f) =>
      f.skillSet.some((s) => requiredSkillSet.includes(s.name)),
    );

    const bestAlternatives = alternatives.filter((a) =>
      a.skillSet.some((s) => requiredSkillSet.includes(s.name)),
    );

    return {
      match: bestMatch,
      requiredSkillSet,
      ...(noRoleExpert ? {} : { alternatives: bestAlternatives }),
    };
  }
}
