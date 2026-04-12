import { appConfig } from "src/common/config/app.config";

export const logger = {
  log: (message: string, body: unknown) => {
    if (appConfig.isDevelopment) {
      console.log(message, body);
    }
  },
  error: (message: string, body: unknown) => {
    if (appConfig.isDevelopment) {
      console.error(message, body);
    }
  },
  warn: (message: string, body: unknown) => {
    if (appConfig.isDevelopment) {
      console.warn(message, body);
    }
  },
};
