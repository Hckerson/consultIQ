import { Injectable } from "@nestjs/common";
import { Lead } from "src/common/interfaces/lead.interface";
import { sortedLeadweight, LeadWeightsSum } from "src/common/data/weights";
import { logger } from "src/lib/logger";

@Injectable()
export class Leads {
  private readonly leadData: Lead;

  constructor(private lead: Lead) {
    this.leadData = lead;
  }

  processLead() {
    try {
      const { blockers, clientInfo, requirements, termination } = this.leadData;
    } catch (error) {
      logger.log("Error processing lead", error);
    }
  }
}
