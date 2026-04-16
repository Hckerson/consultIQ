import { ZodSchema } from "zod";
import { logger } from "src/lib/logger";
import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      logger.log("Validation failed", error);
      throw new BadRequestException("Validation failed");
    }
  }
}
