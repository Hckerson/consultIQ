import { Injectable } from "@nestjs/common";
import { ConsultantMatchResult } from "./consultant.matcher";

@Injectable()
export class ConsultantRankingEngine {
  constructor() {}

  rankConsultants(payload: ConsultantMatchResult) {

    const {subFinalMatch, finalMatch, requiredSkillSets} = payload

    subFinalMatch.map((consultant) => {

    })

  }
}
