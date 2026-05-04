import { Injectable } from "@nestjs/common";
import { Lead } from "generated/prisma/client";
import { LeadRepo } from "@/common/repos/lead.repo";
import { leadConfig } from "@/common/config/lead.config";
import { ContractRepo } from "@/common/repos/contract.repo";
import { EventService } from "@/common/services/emitter.service";
import { LeadDecision, RiskLevel } from "@/common/types/lead.type";
import { LeadClientInfo } from "@/common/interfaces/lead.interface";

@Injectable()
export class LeadDecisionEngine {
  constructor(
    private readonly leadRepo: LeadRepo,
    private readonly emitter: EventService,
    private readonly contractRepo: ContractRepo,
  ) {
    this.initializeListner();
  }

  initializeListner() {
    this.emitter.registerListeners("LEAD_UPDATED", async (lead: Lead[]) => {
      await this.decide(lead[0]);
    });
  }

  async decide(lead: Lead): Promise<void> {
    const decision = await this.recalculate(lead);
    await this.leadRepo.updateLead({
      where: { id: lead.id },
      data: { status: decision },
    });
  }

  async recalculate(lead: Lead): Promise<LeadDecision> {
    const { score, clientInfo } = lead;
    const level: RiskLevel =
      score <= leadConfig.riskThresholds.low
        ? "high"
        : score <= leadConfig.riskThresholds.medium
          ? "medium"
          : "low";
    const info = clientInfo as string;
    const information = JSON.parse(info) as LeadClientInfo;

    // find past dealings
    const pastDealings =
      (await this.contractRepo.countContract({
        companyName: information.companyName,
      })) || 0;

    if (level == "high") {
      if (pastDealings < leadConfig.priority.low) {
        return "REJECT";
      } else if (pastDealings < leadConfig.priority.high) {
        return "HOLD";
      } else {
        return "PURSUE";
      }
    } else if (level == "medium") {
      if (pastDealings < leadConfig.priority.medium) {
        return "HOLD";
      } else if (pastDealings < leadConfig.priority.high) {
        return "PURSUE";
      } else {
        return "PRIORITY_PURSUE";
      }
    } else {
      return "PRIORITY_PURSUE";
    }
  }
}
