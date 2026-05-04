import { Module } from "@nestjs/common";
import { RepoModule } from "@/common/repos/repo.module";
import { LeadScoringEngine } from "./leads/lead.scoring";
import { LeadDecisionEngine } from "./leads/lead.decision";
import { ConsultantMatchingEngine } from "./consultant/consultant.matcher";
import { ConsultantRankingEngine } from "./consultant/consultant.ranker";

@Module({
  imports: [RepoModule],
  providers: [
    LeadScoringEngine,
    LeadDecisionEngine,
    ConsultantMatchingEngine,
    ConsultantRankingEngine,
  ],
  exports: [
    LeadScoringEngine,
    LeadDecisionEngine,
    ConsultantMatchingEngine,
    ConsultantRankingEngine,
  ],
})
export class EngineModule {}
