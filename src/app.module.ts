import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import appConfig from "@common/config/app.config";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { EngineModule } from "./engines/engine.module";
import { AuthModule } from "./modules/core/auth/auth.module";
import { Module, ValidationPipe } from "@nestjs/common";
import { HealthModule } from "./modules/health/health.module";
import { LeadsModule } from "./modules/core/leads/leads.module";
import { PrismaModule } from "./common/database/prisma.module";
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
  imports: [
    AuthModule,
    AuthModule,
    LeadsModule,
    EngineModule,
    HealthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class AppModule {}
