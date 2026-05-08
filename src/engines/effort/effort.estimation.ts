import { EventService } from "@/common/services/emitter.service";

export class EffortEstimationEngine {
  constructor(private readonly emitter: EventService){
    this.initializeListners()
  }
    initializeListners() {
      this.emitter.registerListeners("LEAD_UPDATED", async () => {
        await this.estimateEffort();
      });
    }

    async estimateEffort():Promise<void>{

    }
}