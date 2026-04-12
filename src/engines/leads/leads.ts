import { Injectable } from "@nestjs/common";
import {
  Lead,
  LeadBlocker,
  LeadClientInfo,
  LeadRequirements,
  LeadTermination,
} from "src/common/interfaces/lead.interface";
import { logger } from "src/lib/logger";
import { RiskLevel } from "src/common/types/lead.type";

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

  protected processBlockers(blockers: LeadBlocker ): RiskLevel {
    return 'low'
  }

  protected processClientInfo(clientInfo: LeadClientInfo ): RiskLevel {
    return 'low'
  }

  protected processRequirements(requirements: LeadRequirements ): RiskLevel {
    return 'low'
  }

  protected processTermination(termination: LeadTermination ): RiskLevel {  
    return 'low'
  }
}
