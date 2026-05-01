import { RepositoryError } from "../errors/repo.error";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "generated/prisma/client.js";
import { PrismaService } from "src/services/database/prisma.service";

@Injectable()
export class UserRepo {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to fetch user with id ${userWhereUniqueInput.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw new RepositoryError(
        "Failed to fetch users",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      throw new RepositoryError(
        "Failed to create user",
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to update user with id ${where.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where,
      });
    } catch (error) {
      throw new RepositoryError(
        `Failed to delete user with id ${where.id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
