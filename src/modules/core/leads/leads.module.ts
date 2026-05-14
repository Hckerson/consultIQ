import { Module } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { LeadsController } from "./leads.controller";
import { RepoModule } from "@/common/repos/repo.module";
import { LeadScoringEngine } from "./engines/lead.scoring";
import { EventService } from "@/common/services/emitter.service";

@Module({
  imports: [RepoModule],
  exports: [LeadsService],
  controllers: [LeadsController],
  providers: [LeadsService, LeadScoringEngine, EventService],
})
export class LeadsModule {}
