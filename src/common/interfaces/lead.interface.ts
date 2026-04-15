import { LeadDecision } from "../types/lead.type";

export class LeadBlocker {
  needs: string[];
  problems: string[];
  situation: string[];
}

export class LeadClientInfo {
  companySize: number;
  location: string;
  industry: string;
  authority: {
    activeInfluencers: {
      name: string;
      position: string;
    }[];
    stakeHolders: {
      name: string;
      position: string;
    }[];
  };
  intelletualProperty: string;
}

export class LeadRequirements {
  budget: number;
  timeFrame: number;
  desires: string[];
}

export class Lead {
  blockers: LeadBlocker;
  clientInfo: LeadClientInfo;
  termination: LeadTermination;
  requirements: LeadRequirements;
}
export class LeadTermination {
  percentageRefund: number;
}

export class LeadResponse {
  decision: LeadDecision;
}
