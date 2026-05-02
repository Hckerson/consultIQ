import { Module } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { LeadsController } from "./leads.controller";
import { RepoModule } from "@/common/repos/repo.module";
import { EventService } from "@/services/emitter.service";
import { LeadScoringEngine } from "src/engines/leads/lead.scoring";

@Module({
  imports: [RepoModule],
  exports: [LeadsService],
  controllers: [LeadsController],
  providers: [LeadsService, LeadScoringEngine, EventService],
})
export class LeadsModule {}
