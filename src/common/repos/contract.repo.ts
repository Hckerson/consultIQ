import { Contract } from "generated/prisma/client.js";
import { RepositoryError } from "../errors/repo.error";
import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@/common/database/prisma.service";
import {
  AllContractsQueryDto,
  CountContractQueryDto,
  CreateContractDto,
  SingleContractQueryDto,
  UpdateContractDto,
} from "./query.dto";

@Injectable()
export class ContractRepo {
  constructor(private prisma: PrismaService) {}

  async contract(
    contractWhereUniqueInput: SingleContractQueryDto,
  ): Promise<Contract | null> {
    try {
      return await this.prisma.contract.findUnique({
        where: contractWhereUniqueInput,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to fetch Contract with id ${contractWhereUniqueInput.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async contracts(params: AllContractsQueryDto): Promise<Contract[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.contract.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw new RepositoryError(
        "Failed to fetch Contracts",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async createContract(data: CreateContractDto): Promise<Contract> {
    try {
      return await this.prisma.contract.create({
        data,
      });
    } catch (error) {
      throw new RepositoryError(
        "Failed to create Contract",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async updateContract(params: UpdateContractDto): Promise<Contract> {
    const { where, data } = params;
    try {
      return await this.prisma.contract.update({
        data,
        where,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to update Contract with id ${where.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async deleteContract(where: SingleContractQueryDto): Promise<Contract> {
    try {
      return await this.prisma.contract.delete({
        where,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to delete Contract with id ${where.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async countContract(where: CountContractQueryDto): Promise<number> {
    try {
      return await this.prisma.contract.count({
        where,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to count contracts with id ${where.id as string}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
