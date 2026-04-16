import "dotenv/config";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { appConfig } from "./common/config/app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  await app.listen(appConfig.port ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((error) => {
  console.error("Application failed to start:", error);
  process.exit(1);
});
