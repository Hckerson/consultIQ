import { Experience } from "./interface";
import { Type } from "class-transformer";
import { BaseBooking, BaseUser } from "./base.interface";
import type { SkillLevel, SkillSet } from "../types/types";
import type { ConsultantSpecialization } from "../types/consultant.type";
import { IsNumber, IsArray, ValidateNested, IsIn } from "class-validator";

export class ConsultantExperience {
  @ValidateNested()
  @Type(() => Experience)
  specialization: Experience<ConsultantSpecialization>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Experience)
  otherQualifications: Experience<ConsultantSpecialization>[];
}

export class ConsultantSkillSet {
  @IsIn([
    "Problem_Solving",
    "Communication",
    "Teamwork",
    "Leadership",
    "Adaptability",
    "Time_Management",
    "Other",
  ])
  name: SkillSet;

  @IsIn(["Beginner", "Intermediate", "Advanced", "Expert"])
  level: SkillLevel;
}

export class ConsultantBooking extends BaseBooking {}

export class Consultant extends BaseUser {
  @IsNumber()
  successRate: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsultantSkillSet)
  skillSet: ConsultantSkillSet[];

  @ValidateNested()
  @Type(() => ConsultantExperience)
  qualification: ConsultantExperience;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsultantBooking)
  bookings: ConsultantBooking[];
}
