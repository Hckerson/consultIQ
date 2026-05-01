import { logger } from "src/lib/logger";
import { Injectable } from "@nestjs/common";
import { RiskLevel } from "src/common/types/lead.type";
import { Lead } from "src/common/interfaces/lead.interface";
import { leadConfig } from "../../common/config/lead.config";

import { clientInfoWeights } from "@/common/data/weights.data";
import {
  LeadBlocker,
  LeadClientInfo,
  LeadTermination,
} from "src/common/interfaces/lead.interface";
import {
  favourableIndustry,
  favourableLocation,
  unfavourableIndustry,
  unfavourableLocation,
} from "@/common/data/determinants.data";

@Injectable()
export class LeadScoringEngine {
  constructor() {}

  processLead(lead: Lead): RiskLevel {
    let leadScore: number = 0;

    try {
      const { blockers, clientInfo, termination } = lead;
      leadScore += this.processBlockers(blockers);
      leadScore += this.processClientInfo(clientInfo);
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
    data: LeadBlocker | LeadClientInfo | LeadTermination,
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
    // or admin view and decide
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
