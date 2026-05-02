import { Prisma } from "generated/prisma/client";

//  ===== Leads =====
export interface AllLeadsQueryDto {
  skip?: number;
  take?: number;
  select?: Prisma.LeadSelect;
  where?: Prisma.LeadWhereInput;
  cursor?: Prisma.LeadWhereUniqueInput;
  orderBy?: Prisma.LeadOrderByWithRelationInput;
}
export interface UpdateLeadDto {
  select?: Prisma.LeadSelect;
  data: Prisma.LeadUpdateInput;
  where: Prisma.LeadWhereUniqueInput;
}
export type CreateUserDto = Prisma.UserCreateInput;
export type SingleLeadQueryDto = Prisma.LeadWhereUniqueInput;

//  ===== Users =====
export interface AllUsersQueryDto {
  skip?: number;
  take?: number;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
  where?: Prisma.UserWhereInput;
  cursor?: Prisma.UserWhereUniqueInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
export interface UpdateUserDto {
  select?: Prisma.UserSelect;
  data: Prisma.UserUpdateInput;
  include?: Prisma.UserInclude;
  where: Prisma.UserWhereUniqueInput;
}

export type CreateLeadDto = Prisma.LeadCreateInput;
export type SingleUserQueryDto = Prisma.UserWhereUniqueInput;

//  ===== Contracts =====
export interface AllContractsQueryDto {
  skip?: number;
  take?: number;
  select?: Prisma.ContractSelect;
  where?: Prisma.ContractWhereInput;
  cursor?: Prisma.ContractWhereUniqueInput;
  orderBy?: Prisma.ContractOrderByWithRelationInput;
}
export interface UpdateContractDto {
  select?: Prisma.ContractSelect;
  data: Prisma.ContractUpdateInput;
  where: Prisma.ContractWhereUniqueInput;
}

export type CreateContractDto = Prisma.ContractCreateInput;
export type CountContractQueryDto = Prisma.ContractWhereInput;
export type SingleContractQueryDto = Prisma.ContractWhereUniqueInput;
