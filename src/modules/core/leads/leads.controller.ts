import { Body, Controller } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { Lead } from "src/common/interfaces/lead.interface";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  async processLead(@Body() lead: Lead) {
    return await this.leadsService.processLead(lead);
  }
}
