import { Lead } from "src/common/interfaces/lead.interface";

export default function LeadNormalizer(lead: Lead): Lead {
  return {
    blockers: {
      needs: lead.blockers.needs.map((need) => need.trim()) || [],
      problems: lead.blockers.problems.map((problem) => problem.trim()) || [],
      situation:
        lead.blockers.situation.map((situation) => situation.trim()) || [],
    },
    clientInfo: {
      location: lead.clientInfo.location.trim() || "",
      industry: lead.clientInfo.industry,
      companySize: lead.clientInfo.companySize || 0,
      authority: {
        activeInfluencers:
          lead.clientInfo.authority.activeInfluencers.map((influencer) => ({
            name: influencer.name.trim() || "",
            position: influencer.position.trim() || "",
          })) || [],
        stakeHolders:
          lead.clientInfo.authority.stakeHolders.map((stakeHolder) => ({
            name: stakeHolder.name.trim() || "",
            position: stakeHolder.position.trim() || "",
          })) || [],
      },
      niche: lead.clientInfo.niche.trim() || "",
      intelletualProperty: lead.clientInfo.intelletualProperty.trim() || "",
    },
    requirements: {
      budget: lead.requirements.budget || 0,
      timeFrame: lead.requirements.timeFrame || 0,
      desires: lead.requirements.desires.map((desire) => desire.trim()) || [],
    },
    termination: {
      percentageRefund: lead.termination.percentageRefund || 0,
    },
  };
}
