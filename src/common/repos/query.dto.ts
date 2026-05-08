import { Prisma } from "generated/prisma/client";

//  ===== Leads =====
export type UpdateLeadDto = Prisma.LeadUpdateArgs;
export type CreateLeadDto = Prisma.LeadCreateInput;
export type CountLeadQueryDto = Prisma.LeadWhereInput;
export type AllLeadsQueryDto = Prisma.LeadFindManyArgs;
export type SingleLeadQueryDto = Prisma.LeadWhereUniqueInput;

//  ===== Users =====
export type UpdateUserDto = Prisma.UserUpdateArgs;
export type CreateUserDto = Prisma.UserCreateInput;
export type CountUserQueryDto = Prisma.UserWhereInput;
export type AllUsersQueryDto = Prisma.UserFindManyArgs;
export type SingleUserQueryDto = Prisma.UserWhereUniqueInput;

//  ===== Contracts =====
export type UpdateContractDto = Prisma.ContractUpdateArgs;
export type CreateContractDto = Prisma.ContractCreateInput;
export type CountContractQueryDto = Prisma.ContractWhereInput;
export type AllContractsQueryDto = Prisma.ContractFindManyArgs;
export type SingleContractQueryDto = Prisma.ContractWhereUniqueInput;

//  ===== Consultants =====
export type UpdateConsultantDto = Prisma.ConsultantUpdateArgs;
export type CreateConsultantDto = Prisma.ConsultantCreateInput;
export type CountConsultantQueryDto = Prisma.ConsultantWhereInput;
export type AllConsultantsQueryDto = Prisma.ConsultantFindManyArgs;
export type SingleConsultantQueryDto = Prisma.ConsultantWhereUniqueInput;
