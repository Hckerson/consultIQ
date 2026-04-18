import type { LeadDecision } from "../types/lead.type";
import {
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsIn,
} from "class-validator";
import { Type } from "class-transformer";
import type { Specialization } from "../types/consultant.type";

class ActiveInfluencer {
  @IsString()
  name: string;

  @IsString()
  position: string;
}

class StakeHolder {
  @IsString()
  name: string;

  @IsString()
  position: string;
}

class Authority {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActiveInfluencer)
  activeInfluencers: ActiveInfluencer[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StakeHolder)
  stakeHolders: StakeHolder[];
}

export class LeadBlocker {
  @IsArray()
  @IsString({ each: true })
  needs: string[];

  @IsArray()
  @IsString({ each: true })
  problems: string[];

  @IsArray()
  @IsString({ each: true })
  situation: string[];
}

export class LeadClientInfo {
  @IsNumber()
  companySize: number;

  @IsString()
  location: string;

  @IsString()
  industry: Specialization;

  @IsString()
  niche: string;

  @ValidateNested()
  @Type(() => Authority)
  authority: Authority;

  @IsString()
  intelletualProperty: string;
}

export class LeadRequirements {
  @IsNumber()
  budget: number;

  @IsNumber()
  timeFrame: number;

  @IsArray()
  @IsString({ each: true })
  desires: string[];
}

export class LeadTermination {
  @IsNumber()
  percentageRefund: number;
}

export class Lead {
  @ValidateNested()
  @Type(() => LeadBlocker)
  blockers: LeadBlocker;

  @ValidateNested()
  @Type(() => LeadClientInfo)
  clientInfo: LeadClientInfo;

  @ValidateNested()
  @Type(() => LeadTermination)
  termination: LeadTermination;

  @ValidateNested()
  @Type(() => LeadRequirements)
  requirements: LeadRequirements;
}

export class LeadResponse {
  @IsIn(["reject", "hold", "pursue", "priority-pursue"])
  decision: LeadDecision;
}
