import { Module } from "@nestjs/common";
import { LeadScoringEngine } from "./leads/lead.scoring";
import { ConsultantMatchingEngine } from "./consultant/consultant.matcher";

@Module({
  providers: [LeadScoringEngine, ConsultantMatchingEngine],
  exports: [LeadScoringEngine, ConsultantMatchingEngine],
})
export class EngineModule {}
