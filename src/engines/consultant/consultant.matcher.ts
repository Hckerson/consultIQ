import { Injectable } from "@nestjs/common";
import { SkillSet } from "@/common/types/types";
import { skillSetKeywords } from "@/common/data/determinants";
import { PrismaService } from "@/services/database/prisma.service";
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

  async matchConsultant(lead: Lead) {
    const { clientInfo, blockers } = lead;

    const requiredSkillSets = this.extractRequiredSkillSets(blockers);

    const availableConsultants = await this.prisma.consultant.findMany({
      where: {
        
      },
    });

    return {
      requiredSkillSets,
      availableConsultants,
    };
  }
}
