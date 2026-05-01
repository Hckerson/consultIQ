import { Module } from "@nestjs/common";
import { LeadRepo } from "./lead.repo";
import { UserRepo } from "./user.repo";

@Module({
  providers: [LeadRepo, UserRepo],
  exports: [LeadRepo, UserRepo],
})
export class RepoModule {}
