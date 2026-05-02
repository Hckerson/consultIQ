import { Injectable } from "@nestjs/common";
import { LeadsService } from "../leads/leads.service";

@Injectable()
export class AdminService {
  constructor(private readonly leadService: LeadsService) {}

  fetchUnprocessedLeads() {
    return this.leadService.fetchUnprocessedLeads();
  }

  finalizeLead(leadId: string, newScore: number) {
    return this.leadService.adminLeadUpdate(leadId, newScore);
  }

  discardLead(leadId: string) {
    return this.leadService.discardLead(leadId);
  }

  fetchDiscardedLeads() {
    return this.leadService.fetchDiscardedLeads();
  }
}
