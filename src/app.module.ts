import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./modules/auth/auth.module";
import { Module, ValidationPipe } from "@nestjs/common";
import { HealthModule } from "./modules/health/health.module";
import { LeadsModule } from "./modules/core/leads/leads.module";
import { HttpExceptionFilter } from "./common/filters/http-exception-filter";

@Module({
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [AppController],
  imports: [AuthModule, HealthModule, AuthModule, LeadsModule],
})
export class AppModule {}
