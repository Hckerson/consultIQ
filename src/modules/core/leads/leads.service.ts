import { Injectable } from "@nestjs/common";
import { LeadRepo } from "@/common/repos/lead.repo";
import { Lead } from "src/common/interfaces/lead.interface";
import LeadNormalizer from "src/engines/leads/lead.normalizer";
import { LeadScoringEngine } from "src/engines/leads/lead.scoring";
import { AllLeadsQueryDto } from "@/common/repos/query.dto";

@Injectable()
export class LeadsService {
  constructor(
    private readonly leadRepo: LeadRepo,
    private readonly leadEngine: LeadScoringEngine,
  ) {}
  processLead(lead: Lead) {
    const normalizedLeadInput = LeadNormalizer(lead);
    const leadScore = this.leadEngine.processLead(normalizedLeadInput);
    return leadScore;
  }

  fetchAllLead(params: AllLeadsQueryDto) {
    return this.leadRepo.leads(params);
  }

  fetchLeadById(id: string) {
    return this.leadRepo.lead({ id });
  }
}
