import { LeadDecision } from "../types/lead.type";

export class LeadBlocker {
  needs: string[];
  problems: string[];
  situation: string[];
}

export class LeadClientInfo {
  companySize:number
  location: string;
  industry: string;
  auhority: {
    activeInfluencers: {
      name: string;
      position: string;
    }[];
    executives: {
      name: string;
      position: string;
    }[];
    substitutes: {
      name: string;
      position: string;
    }[];
  };
  intelletualProperty: string;
}

export class LeadRequirements {
  budget: string;
  service: string;
  timeline: string;
  desires: string[];
}

export class Lead {
  blockers: LeadBlocker;
  clientInfo: LeadClientInfo;
  termination: LeadTermination;
  requirements: LeadRequirements;
}
export class LeadTermination {
  reason: string;
  endDate: string;
}

export class LeadResponse {
  decision: LeadDecision;
}
