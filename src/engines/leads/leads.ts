import { Injectable } from "@nestjs/common";
import {
  Lead,
  LeadBlocker,
  LeadClientInfo,
  LeadRequirements,
  LeadTermination,
} from "src/common/interfaces/lead.interface";
import { logger } from "src/lib/logger";
import { Levels, RiskLevel } from "src/common/types/lead.type";
import { clientInfoWeights } from "src/common/data/weights";

@Injectable()
export class Leads {
  private readonly leadData: Lead;

  constructor(private lead: Lead) {
    this.leadData = lead;
  }

  protected processLead() {
    try {
      const { blockers, clientInfo, requirements, termination } = this.leadData;
      this.processBlockers(blockers);
      this.processClientInfo(clientInfo);
      this.processRequirements(requirements);
      this.processTermination(termination);
    } catch (error) {
      logger.log("Error processing lead", error);
    }
  }

  protected processBlockers(blockers: LeadBlocker): RiskLevel {
    // this would be done using ai
    return "low";
  }

  protected processClientInfo(clientInfo: LeadClientInfo): RiskLevel {
    let score: number = 0;
    const total: number = 25;
    const { companySize, location, industry, auhority, intelletualProperty } =
      clientInfo;

    let forFeit = 0;
    Object.entries(clientInfo).forEach(([_, value]) => {
      if (!value) {
        forFeit += 2;
      }
    });

    if (companySize < 100) {
      score = +clientInfoWeights.companySize * 10;
    } else if (companySize < 1000) {
      score = +clientInfoWeights.companySize * 20;
    } else {
      score = +clientInfoWeights.companySize * 30;
    }

    score -= 2;

    const value = score < 10 ? "low" : score < 20 ? "medium" : "high";
    return value;
  }

  protected processRequirements(requirements: LeadRequirements): RiskLevel {
    return "low";
  }

  protected processTermination(termination: LeadTermination): RiskLevel {
    return "low";
  }
}
