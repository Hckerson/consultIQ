import { Prisma } from "generated/prisma/client";

//  ===== Leads =====
export interface AllLeadsQueryDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.LeadWhereUniqueInput;
  where?: Prisma.LeadWhereInput;
  orderBy?: Prisma.LeadOrderByWithRelationInput;
}
export interface UpdateLeadDto {
  where: Prisma.LeadWhereUniqueInput;
  data: Prisma.LeadUpdateInput;
}
export type SingleLeadQueryDto = Prisma.LeadWhereUniqueInput;
export type CreateUserDto = Prisma.UserCreateInput;

//  ===== Users =====
export interface AllUsersQueryDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
export interface UpdateUserDto {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}

export type SingleUserQueryDto = Prisma.UserWhereUniqueInput;
export type CreateLeadDto = Prisma.LeadCreateInput;
