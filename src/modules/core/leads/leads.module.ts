import { Module } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { LeadsController } from "./leads.controller";
import { LeadScoringEngine } from "src/engines/leads/lead.scoring";

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, LeadScoringEngine],
})
export class LeadsModule {}
