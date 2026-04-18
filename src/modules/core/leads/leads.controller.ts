import { LeadsService } from "./leads.service";
import { Lead } from "src/common/interfaces/lead.interface";
import { Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  processLead(@Body() lead: Lead) {
    return this.leadsService.processLead(lead);
  }

  @Get("test")
  test() {
    throw new InternalServerErrorException("Bad boy");
  }
}
