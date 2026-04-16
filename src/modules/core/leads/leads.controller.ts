import { LeadsService } from "./leads.service";
import { Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import { LeadInput } from "src/common/schema/lead.schema";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  processLead(@Body() lead: LeadInput) {
    return this.leadsService.processLead(lead);
  }

  @Get("test")
  test() {
    throw new InternalServerErrorException("Bad boy");
  }
}
