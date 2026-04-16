import { LeadsService } from "./leads.service";
import { leadSchema } from "src/common/schema/lead.schema";
import type { LeadInput } from "src/common/schema/lead.schema";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/pipes/zod.validation";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(leadSchema))
  processLead(@Body() lead: LeadInput) {
    return this.leadsService.processLead(lead);
  }
}