import { Injectable } from "@nestjs/common";
import { Lead } from "src/common/interfaces/lead.interface";
import LeadNormalizer from "src/engines/leads/lead.normalizer";
import { LeadScoringEngine } from "src/engines/leads/lead.scoring";

@Injectable()
export class LeadsService {
  constructor(private readonly leadEngine: LeadScoringEngine) {}
  processLead(lead: Lead) {
    const normalizedLeadInput = LeadNormalizer(lead);
    const leadScore = this.leadEngine.processLead(normalizedLeadInput);
    return leadScore;
  }

  fetchAllLead() {
    
  }

  fetchLeadById(id: string) {

  }
}
