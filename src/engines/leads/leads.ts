import { Injectable } from "@nestjs/common";
import { logger } from "src/lib/logger";
import { RiskLevel } from "src/common/types/lead.type";
import {
  clientInfoWeights,
  requirementsWeights,
} from "src/common/data/weights";
import {
  Lead,
  LeadBlocker,
  LeadClientInfo,
  LeadRequirements,
  LeadTermination,
} from "src/common/interfaces/lead.interface";
import {
  desireLength,
  favourableIndustry,
  favourableLocation,
  timeline,
  unfavourableIndustry,
  unfavourableLocation,
} from "src/common/data/determinants";

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

  protected processOmission(
    data: LeadBlocker | LeadClientInfo | LeadRequirements | LeadTermination,
  ) {
    let score: number = 0;
    // const total: number = 25;

    let forFeit = 0;
    Object.entries(data).forEach(([_, value]) => {
      if (!value) {
        forFeit += 2;
      }
    });

    score -= forFeit;
    return score;
  }

  protected processBlockers(blockers: LeadBlocker): RiskLevel {
    // this would be done using ai
    let score: number = 0;

    const forfeit = this.processOmission(blockers);
    score -= forfeit;

    const value = score < 10 ? "low" : score < 20 ? "medium" : "high";
    return value;
  }

  protected processClientInfo(clientInfo: LeadClientInfo): RiskLevel {
    let score: number = 0;
    // const total: number = 25;
    const { companySize, location, industry, authority, intelletualProperty } =
      clientInfo;

    const forFeit = this.processOmission(clientInfo);

    // process company size
    if (companySize) {
      if (companySize < 100) {
        score += +clientInfoWeights.companySize * 10;
      } else if (companySize < 1000) {
        score += +clientInfoWeights.companySize * 20;
      } else {
        score += +clientInfoWeights.companySize * 25;
      }
    }

    // process location
    if (location) {
      if (favourableLocation.includes(location)) {
        score += +clientInfoWeights.location * 25;
      } else if (unfavourableLocation.includes(location)) {
        score += +clientInfoWeights.location * 10;
      } else {
        score += +clientInfoWeights.location * 20;
      }
    }

    // process industry
    if (industry) {
      if (favourableIndustry.includes(industry)) {
        score += +clientInfoWeights.industry * 25;
      } else if (unfavourableIndustry.includes(industry)) {
        score += +clientInfoWeights.industry * 10;
      } else {
        score += +clientInfoWeights.industry * 20;
      }
    }

    // process intellectual Property
    if (intelletualProperty) {
      score += +clientInfoWeights.intelletualProperty * 25;
    } else {
      score += +clientInfoWeights.intelletualProperty * 10;
    }

    if (authority) {
      const { activeInfluencers, stakeHolders } = authority;
      if (activeInfluencers.length > stakeHolders.length)
        score += +clientInfoWeights.authority * 10;
      else score += +clientInfoWeights.authority * 25;
    }

    score -= forFeit;

    const value = score < 10 ? "low" : score < 20 ? "medium" : "high";
    return value;
  }

  protected processRequirements(
    requirements: LeadRequirements,
    industry: string,
    companySize: number,
  ): RiskLevel {
    let score: number = 0;
    // const total: number = 25;

    const forFeit = this.processOmission(requirements);
    const { budget, timeFrame, desires } = requirements;

    if (budget) {
      if (favourableIndustry.includes(industry) && companySize > 100) {
        if (budget < 1000) {
          score += +requirementsWeights.budget * 10;
          if (timeFrame > timeline.medium) {
            score += +requirementsWeights.timeline * 10;
          } else {
            score += +requirementsWeights.timeline * 20;
          }
          if (desires.length > desireLength.medium) {
            score += +requirementsWeights.desires * 10;
          } else {
            score += +requirementsWeights.desires * 20;
          }
        } else if (budget < 10000) {
          score += +requirementsWeights.budget * 20;
          if (timeFrame > timeline.long) {
            score += +requirementsWeights.timeline * 15;
          } else {
            score += +requirementsWeights.timeline * 20;
          }
          if (desires.length > desireLength.large) {
            score += +requirementsWeights.desires * 15;
          } else {
            score += +requirementsWeights.desires * 20;
          }
        } else {
          score += +requirementsWeights.budget * 25;
          score += +requirementsWeights.timeline * 25;
          score += +requirementsWeights.desires * 25;
        }
      } else {
        if (budget < 750) {
          score += +requirementsWeights.budget * 15;
          if (timeFrame > timeline.short) {
            score += +requirementsWeights.timeline * 15;
          } else {
            score += +requirementsWeights.timeline * 20;
          }
          if (desires.length > desireLength.small) {
            score += +requirementsWeights.desires * 15;
          } else {
            score += +requirementsWeights.desires * 20;
          }
        } else if (budget < 7500) {
          score += +requirementsWeights.budget * 20;
          if (timeFrame > timeline.medium) {
            score += +requirementsWeights.timeline * 15;
          } else {
            score += +requirementsWeights.timeline * 20;
          }
          if (desires.length > desireLength.medium) {
            score += +requirementsWeights.desires * 15;
          } else {
            score += +requirementsWeights.desires * 20;
          }
        } else {
          score += +requirementsWeights.budget * 25;
          score += +requirementsWeights.timeline * 25;
          score += +requirementsWeights.desires * 25;
        }
      }
    }

    score -= forFeit;

    const value = score < 10 ? "low" : score < 20 ? "medium" : "high";
    return value;
  }

  protected processTermination(termination: LeadTermination): RiskLevel {
    let score: number = 0;
    // const total: number = 25;

    const forFeit = this.processOmission(termination);

    score -= forFeit;

    const value = score < 10 ? "low" : score < 20 ? "medium" : "high";
    return value;
  }
}
