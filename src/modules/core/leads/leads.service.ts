import { Injectable } from "@nestjs/common";
import { LeadRepo } from "@/common/repos/lead.repo";
import { Lead } from "src/common/interfaces/lead.interface";
import LeadNormalizer from "src/engines/leads/lead.normalizer";
import { LeadScoringEngine } from "src/engines/leads/lead.scoring";
import { AllLeadsQueryDto, CreateLeadDto } from "@/common/repos/query.dto";

@Injectable()
export class LeadsService {
  constructor(
    private readonly leadRepo: LeadRepo,
    private readonly leadEngine: LeadScoringEngine,
  ) {}
  async processLead(lead: Lead) {
    const normalizedLeadInput = LeadNormalizer(lead);
    const leadScore = this.leadEngine.processLead(normalizedLeadInput);
    await this.createLead(normalizedLeadInput, leadScore);
    return leadScore;
  }

  fetchAllLead(params: AllLeadsQueryDto) {
    return this.leadRepo.leads(params);
  }

  fetchLeadById(id: string) {
    return this.leadRepo.lead({ id });
  }

  createLead(lead: Lead, score: number) {
    const payload: CreateLeadDto = {
      ...lead,
      blockers: JSON.stringify(lead.blockers),
      clientInfo: JSON.stringify(lead.clientInfo),
      termination: JSON.stringify(lead.termination),
      score,
    };
    return this.leadRepo.createLead(payload);
  }

  fetchUnprocessedLeads() {
    return this.leadRepo.leads({ where: { processed: false } });
  }
}
