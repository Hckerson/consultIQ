import { LeadBlocker, LeadClientInfo } from "@/common/interfaces/lead.interface";
import { EventService } from "@/common/services/emitter.service";
import { Lead } from "generated/prisma/browser";

export class EffortEstimationEngine {
  constructor(private readonly emitter: EventService){
    this.initializeListners()
  }
    initializeListners() {
      this.emitter.registerListeners("LEAD_UPDATED", async (lead:Lead[]) => {
        await this.estimateEffort(lead[0]);
      });
    }

    async estimateEffort(lead:Lead):Promise<void>{
      const {clientInfo, blockers} = lead;
      const clientInfoData = JSON.parse(clientInfo as string) as LeadClientInfo
      const blockersData = JSON.parse(blockers as string) as LeadBlocker

      
    }
}