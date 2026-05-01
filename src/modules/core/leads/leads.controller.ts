import { LeadsService } from "./leads.service";
import { Lead } from "src/common/interfaces/lead.interface";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type { AllLeadsQueryDto } from "@/common/repos/query.dto";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post("process")
  processLead(@Body() lead: Lead) {
    return this.leadsService.processLead(lead);
  }

  @Get("all")
  async fetchAllLead(@Body() params: AllLeadsQueryDto) {
    return await this.leadsService.fetchAllLead(params);
  }

  @Get(":id")
  async fetchLeadById(@Param("id") id: string) {
    return await this.leadsService.fetchLeadById(id);
  }
}
