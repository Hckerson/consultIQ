import { Injectable } from "@nestjs/common";
import { Consultant } from "src/common/interfaces/consultant.interface";
import { Lead } from "src/common/interfaces/lead.interface";

@Injectable()
export class ConsultantMatchingEngine {
  constructor() {}

  matchConsultant(
    consultant: Pick<
      Consultant,
      "bookings" | "successRate" | "skillSet" | "qualification"
    >,
    lead: Lead,
  ) {
    
  }
}
