import { HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Lead } from "generated/prisma/client.js";
import { PrismaService } from "src/services/database/prisma.service";
import { RepositoryError } from "../errors/repo.error";

@Injectable()
export class LeadRepo {
  constructor(private prisma: PrismaService) {}

  async lead(
    LeadWhereUniqueInput: Prisma.LeadWhereUniqueInput,
  ): Promise<Lead | null> {
    try {
      return await this.prisma.lead.findUnique({
        where: LeadWhereUniqueInput,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to fetch lead with id ${LeadWhereUniqueInput.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async leads(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LeadWhereUniqueInput;
    where?: Prisma.LeadWhereInput;
    orderBy?: Prisma.LeadOrderByWithRelationInput;
  }): Promise<Lead[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.lead.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw new RepositoryError(
        "Failed to fetch leads",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async createLead(data: Prisma.LeadCreateInput): Promise<Lead> {
    try {
      return await this.prisma.lead.create({
        data,
      });
    } catch (error) {
      throw new RepositoryError(
        "Failed to create lead",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async updateLead(params: {
    where: Prisma.LeadWhereUniqueInput;
    data: Prisma.LeadUpdateInput;
  }): Promise<Lead> {
    const { where, data } = params;
    try {
      return await this.prisma.lead.update({
        data,
        where,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to update lead with id ${where.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async deleteLead(where: Prisma.LeadWhereUniqueInput): Promise<Lead> {
    try {
      return await this.prisma.lead.delete({
        where,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to delete lead with id ${where.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
