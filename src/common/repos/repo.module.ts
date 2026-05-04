import { Module } from "@nestjs/common";
import { LeadRepo } from "./lead.repo";
import { UserRepo } from "./user.repo";
import { ContractRepo } from "./contract.repo";

@Module({
  providers: [LeadRepo, UserRepo, ContractRepo],
  exports: [LeadRepo, UserRepo, ContractRepo],
})
export class RepoModule {}
