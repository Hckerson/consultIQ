import { Module } from "@nestjs/common";
import { RepoModule } from "@/common/repos/repo.module";

import { ConsultantMatchingEngine } from "../modules/core/consultant/engines/consultant.matcher";
import { ConsultantRankingEngine } from "../modules/core/consultant/engines/consultant.ranker";
import { EventService } from "@/common/services/emitter.service";

@Module({
  imports: [RepoModule],
  providers: [EventService, ConsultantMatchingEngine, ConsultantRankingEngine],
  exports: [ConsultantMatchingEngine, ConsultantRankingEngine],
})
export class EngineModule {}
