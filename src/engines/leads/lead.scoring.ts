import { logger } from "src/lib/logger";
import { leadConfig } from "./lead.config";
import { Injectable } from "@nestjs/common";
import { RiskLevel } from "src/common/types/lead.type";
import { LeadInput } from "src/common/schema/lead.schema";
import {
  clientInfoWeights,
  requirementsWeights,
} from "src/common/data/weights";
import {
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
export class LeadScoringEngine {
  constructor() {}

  processLead(lead: LeadInput): RiskLevel {
    let leadScore: number = 0;

    try {
      const { blockers, clientInfo, requirements, termination } = lead;
      leadScore += this.processBlockers(blockers);
      leadScore += this.processClientInfo(clientInfo);
      leadScore += this.processRequirements(
        requirements,
        clientInfo.industry,
        clientInfo.companySize,
      );
      leadScore += this.processTermination(termination);
    } catch (error) {
      logger.log("Error processing lead", error);
      return "low";
    }

    return leadScore < leadConfig.riskThresholds.low
      ? "low"
      : leadScore < leadConfig.riskThresholds.medium
        ? "medium"
        : "high";
  }

  protected processOmission(
    data: LeadBlocker | LeadClientInfo | LeadRequirements | LeadTermination,
  ): number {
    let score: number = 0; // const total: number = 25;

    let forFeit = 0;
    Object.entries(data).forEach(([, value]) => {
      if (!value) {
        forFeit += leadConfig.omissionForfeit;
      }
    });

    score -= forFeit;
    return score;
  }

  protected processBlockers(blockers: LeadBlocker): number {
    // this would be done using ai
    let score: number = 0;

    const forfeit = this.processOmission(blockers);
    score -= forfeit;

    return score;
  }

  protected processClientInfo(clientInfo: LeadClientInfo): number {
    let score: number = 0;
    const { companySize, location, industry, authority, intelletualProperty } =
      clientInfo;

    const forFeit = this.processOmission(clientInfo);

    // process company size
    if (companySize) {
      if (companySize < leadConfig.companySize.small) {
        score += +clientInfoWeights.companySize * leadConfig.scores.standard;
      } else if (companySize < leadConfig.companySize.medium) {
        score += +clientInfoWeights.companySize * leadConfig.scores.boost;
      } else {
        score += +clientInfoWeights.companySize * leadConfig.scores.max;
      }
    }

    // process location
    if (location) {
      if (favourableLocation.includes(location)) {
        score += +clientInfoWeights.location * leadConfig.scores.max;
      } else if (unfavourableLocation.includes(location)) {
        score += +clientInfoWeights.location * leadConfig.scores.base;
      } else {
        score += +clientInfoWeights.location * leadConfig.scores.standard;
      }
    }

    // process industry
    if (industry) {
      if (favourableIndustry.includes(industry)) {
        score += +clientInfoWeights.industry * leadConfig.scores.max;
      } else if (unfavourableIndustry.includes(industry)) {
        score += +clientInfoWeights.industry * leadConfig.scores.base;
      } else {
        score += +clientInfoWeights.industry * leadConfig.scores.standard;
      }
    }

    // process intellectual Property
    if (intelletualProperty) {
      score += +clientInfoWeights.intelletualProperty * leadConfig.scores.max;
    } else {
      score += +clientInfoWeights.intelletualProperty * leadConfig.scores.base;
    }

    if (authority) {
      const { activeInfluencers, stakeHolders } = authority;
      if (activeInfluencers.length > stakeHolders.length)
        score += +clientInfoWeights.authority * leadConfig.scores.base;
      else score += +clientInfoWeights.authority * leadConfig.scores.max;
    }

    score -= forFeit;

    return score;
  }

  protected processRequirements(
    requirements: LeadRequirements,
    industry: string,
    companySize: number,
  ): number {
    let score: number = 0;

    const forFeit = this.processOmission(requirements);
    const { budget, timeFrame, desires } = requirements;

    if (budget) {
      if (
        favourableIndustry.includes(industry) &&
        companySize > leadConfig.companySize.small
      ) {
        if (budget < leadConfig.budget.large) {
          score += +requirementsWeights.budget * leadConfig.scores.base;
          if (timeFrame > timeline.medium) {
            score += +requirementsWeights.timeline * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.timeline * leadConfig.scores.boost;
          }
          if (desires.length > desireLength.medium) {
            score += +requirementsWeights.desires * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.desires * leadConfig.scores.boost;
          }
        } else if (budget < leadConfig.budget.enterprise) {
          score += +requirementsWeights.budget * leadConfig.scores.standard;
          if (timeFrame > timeline.long) {
            score += +requirementsWeights.timeline * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.timeline * leadConfig.scores.boost;
          }
          if (desires.length > desireLength.large) {
            score += +requirementsWeights.desires * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.desires * leadConfig.scores.boost;
          }
        } else {
          score += +requirementsWeights.budget * leadConfig.scores.max;
          score += +requirementsWeights.timeline * leadConfig.scores.max;
          score += +requirementsWeights.desires * leadConfig.scores.max;
        }
      } else {
        if (budget < leadConfig.budget.small) {
          score += +requirementsWeights.budget * leadConfig.scores.base;
          if (timeFrame > timeline.short) {
            score += +requirementsWeights.timeline * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.timeline * leadConfig.scores.boost;
          }
          if (desires.length > desireLength.small) {
            score += +requirementsWeights.desires * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.desires * leadConfig.scores.boost;
          }
        } else if (budget < leadConfig.budget.medium) {
          score += +requirementsWeights.budget * leadConfig.scores.standard;
          if (timeFrame > timeline.medium) {
            score += +requirementsWeights.timeline * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.timeline * leadConfig.scores.boost;
          }
          if (desires.length > desireLength.medium) {
            score += +requirementsWeights.desires * leadConfig.scores.standard;
          } else {
            score += +requirementsWeights.desires * leadConfig.scores.boost;
          }
        } else {
          score += +requirementsWeights.budget * leadConfig.scores.max;
          score += +requirementsWeights.timeline * leadConfig.scores.max;
          score += +requirementsWeights.desires * leadConfig.scores.max;
        }
      }
    }

    score -= forFeit;

    return score;
  }

  protected processTermination(termination: LeadTermination): number {
    let score: number = 0;

    const forFeit = this.processOmission(termination);

    const { percentageRefund } = termination;

    if (percentageRefund < leadConfig.refundThresholds.low) {
      score += leadConfig.scores.max;
    } else if (percentageRefund < leadConfig.refundThresholds.high) {
      score += leadConfig.scores.boost;
    } else {
      score += leadConfig.scores.standard;
    }
    score -= forFeit;
    return score;
  }
}
