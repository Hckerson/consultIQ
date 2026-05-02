import { Controller, Get, Param, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("leads/unprocessed")
  async fetchUnprocessedLeads() {
    return await this.adminService.fetchUnprocessedLeads();
  }
  @Post("leads/:id/finalize")
  async finalizeLead(@Param("id") leadId: string) {
    return await this.adminService.finalizeLead(leadId);
  }
}
