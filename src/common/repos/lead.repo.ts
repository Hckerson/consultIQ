import { Injectable } from "@nestjs/common";
import { Prisma, Lead } from "generated/prisma/client.js";
import { PrismaService } from "src/services/database/prisma.service";

@Injectable()
export class LeadRepo {
  constructor(private prisma: PrismaService) {}

  async lead(
    LeadWhereUniqueInput: Prisma.LeadWhereUniqueInput,
  ): Promise<Lead | null> {
    const lead = await this.prisma.lead.findUnique({
      where: LeadWhereUniqueInput,
    });
    return lead;
  }

  async leads(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LeadWhereUniqueInput;
    where?: Prisma.LeadWhereInput;
    orderBy?: Prisma.LeadOrderByWithRelationInput;
  }): Promise<Lead[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.lead.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createLead(data: Prisma.LeadCreateInput): Promise<Lead> {
    return await this.prisma.lead.create({
      data,
    });
  }

  async updateLead(params: {
    where: Prisma.LeadWhereUniqueInput;
    data: Prisma.LeadUpdateInput;
  }): Promise<Lead> {
    const { where, data } = params;
    return await this.prisma.lead.update({
      data,
      where,
    });
  }

  async deleteLead(where: Prisma.LeadWhereUniqueInput): Promise<Lead> {
    return await this.prisma.lead.delete({
      where,
    });
  }
}
