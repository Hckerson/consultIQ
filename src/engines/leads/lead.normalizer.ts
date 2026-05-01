import { Lead } from "src/common/interfaces/lead.interface";

export default function LeadNormalizer(lead: Lead): Lead {
  return {
    blockers: {
      needs: lead.blockers.needs
        .filter((need) => need.trim())
        .map((need) => need.trim()),
      problems: lead.blockers.problems
        .filter((problem) => problem.trim())
        .map((problem) => problem.trim()),
      situation: lead.blockers.situation
        .filter((situation) => situation.trim())
        .map((situation) => situation.trim()),
    },
    clientInfo: {
      location: lead.clientInfo.location.trim() || "",
      industry: lead.clientInfo.industry,
      companySize: lead.clientInfo.companySize || 0,
      niche: lead.clientInfo.niche.trim() || "",
      intelletualProperty: lead.clientInfo.intelletualProperty || false,
      authority: {
        activeInfluencers: lead.clientInfo.authority.activeInfluencers
          .filter((influencer) => influencer.name.trim())
          .map((influencer) => ({
            name: influencer.name.trim(),
            position: influencer.position.trim(),
          })),
        stakeHolders: lead.clientInfo.authority.stakeHolders
          .filter((stakeHolder) => stakeHolder.name.trim())
          .map((stakeHolder) => ({
            name: stakeHolder.name.trim(),
            position: stakeHolder.position.trim(),
          })),
      },
    },
    termination: {
      percentageRefund: lead.termination.percentageRefund || 0,
    },
  };
}
