import { Injectable } from "@nestjs/common";
import { ConsultantMatchResult } from "./consultant.matcher";

@Injectable()
export class ConsultantRankingEngine {
  constructor() {}

  rankConsultants(payload: ConsultantMatchResult) {
    const { match, alternatives, requiredSkillSet } = payload;

    const matchWithCount = match.map((consultant) => {
      const skillCount = consultant.skillSet.filter((skill) =>
        requiredSkillSet.includes(skill.name),
      ).length;
      return {
        skillCount,
        ...consultant,
      };
    });

    const alternativeWithCount = alternatives?.map((consultant) => {
      const skillCount = consultant.skillSet.filter((skill) =>
        requiredSkillSet.includes(skill.name),
      ).length;
      return {
        skillCount,
        ...consultant,
      };
    });

    const rankedMatch = matchWithCount.sort(
      (a, b) => b.skillCount - a.skillCount,
    );

    const rankedAlternative = alternativeWithCount?.sort(
      (a, b) => b.skillCount - a.skillCount,
    );

    return { match: rankedMatch, alternatives: rankedAlternative };
  }
}
