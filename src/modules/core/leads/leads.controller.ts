import { LeadsService } from "./leads.service";
import { Lead } from "src/common/interfaces/lead.interface";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  processLead(@Body() lead: Lead) {
    return this.leadsService.processLead(lead);
  }

  @Get("all")
  fetchAllLead() {
    return this.leadsService.fetchAllLead();
  }

  @Get(":id")
  fetchLeadById(@Param("id") id: string) {
    return this.leadsService.fetchLeadById(id);
  }
}
