import { IsNumber, IsString, IsArray, IsDefined } from "class-validator";

export class Experience<T> {
  @IsDefined()
  title: T;

  @IsNumber()
  years: number;

  @IsArray()
  @IsString({ each: true })
  niches: string[];
}
