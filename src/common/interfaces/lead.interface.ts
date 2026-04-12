class LeadBlocker {
  needs: string[];
  problems: string[];
  situation: string[];
}

class LeadClientInfo {
  companySize: {
    min: number;
    max: number;
  };
  location: string;
  industry: string;
  auhority: {
    activeInfluencers: {
      name: string;
      position: string;
    }[];
    decisionMakers: {
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

class LeadRequirements {
  budget: string;
  service: string;
  urgency;
  timeline: string;
  desires: string[];
}

export class Lead {
  blockers: LeadBlocker;
  clientInfo: LeadClientInfo;
  termination: LeadTermination;
  requirements: LeadRequirements;
}
class LeadTermination {
  reason: string;
  endDate: string;
}

export class LeadResponse {}
