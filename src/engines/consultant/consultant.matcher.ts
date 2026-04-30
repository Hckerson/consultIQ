import { Injectable } from "@nestjs/common";
import { Lead } from "src/common/interfaces/lead.interface";
import { PrismaService } from "@/services/database/prisma.service";
import { Consultant } from "src/common/interfaces/consultant.interface";

@Injectable()
export class ConsultantMatchingEngine {
  constructor(private readonly prisma: PrismaService) {}

  async matchConsultant(consultant: Consultant, lead: Lead) {
    const { clientInfo, blockers } = lead;
    const availableConsultants = await this.prisma.consultant.findMany({
      
    });
  }
}
