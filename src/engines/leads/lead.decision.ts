import { leadConfig } from "@/common/config/lead.config";
import { LeadDecision, RiskLevel } from "@/common/types/lead.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LeadDecisionEngine {
  constructor() {
    
  }

  decide(): LeadDecision {
    const leadScore: number = 0;
    // just avaoiding linitng, not actual logic
    const level: RiskLevel =
      leadScore < leadConfig.riskThresholds.low
        ? "low"
        : leadScore < leadConfig.riskThresholds.medium
          ? "medium"
          : "high";
    console.log(level);

    return "hold";
  }
}
