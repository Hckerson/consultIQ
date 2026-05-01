import { LeadDecision } from "@/common/types/lead.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LeadDecisionEngine {
  constructor() {}

  decide(): LeadDecision {
    return "hold";
  }
}
