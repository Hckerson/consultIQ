import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { LeadsModule } from "../leads/leads.module";
import { AdminController } from "./admin.controller";

@Module({
  imports: [LeadsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
