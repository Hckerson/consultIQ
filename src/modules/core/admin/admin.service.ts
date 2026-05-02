import { Injectable } from "@nestjs/common";
import { LeadsService } from "../leads/leads.service";

@Injectable()
export class AdminService {
  constructor(private readonly leadService: LeadsService) {}

  fetchUnprocessedLeads() {
    return this.leadService.fetchUnprocessedLeads();
  }

  finalizeLead(leadId: string){
    return this.leadService.updateLead(leadId, {processed: true})
  }
}
