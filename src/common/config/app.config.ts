import * as z from "zod";
import { registerAs } from "@nestjs/config";
import { InternalServerErrorException } from "@nestjs/common";


const envSchema = z.object({
  PORT: z.number().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    "Invalid environment variables \n",
    "=======   Missing vars   ======= \n",
    result.error.issues.map((issue) => issue.message).join("\n"),
  );
  throw new InternalServerErrorException("Invalid environment variables");
}

export const appConfig = {
  port: result.data.PORT,
  nodeEnv: result.data.NODE_ENV,
  isDevelopment: result.data.NODE_ENV === "development",
  isProduction: result.data.NODE_ENV === "production",
};

export default registerAs("app", () => ({
  ...appConfig,
}));

export type AppConfig = typeof appConfig;
