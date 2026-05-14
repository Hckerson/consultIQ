import type { LeadDecision } from "../types/lead.type";
import {
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  IsIn,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import type { Specialization } from "../types/consultant.type";

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
  companyName: string;

  // replaced with real niches in actual specializations
  @IsString()
  niche: string;

  @ValidateNested()
  @Type(() => Authority)
  authority: Authority;

  @IsBoolean()
  intelletualProperty: boolean;
}

export class LeadTermination {
  @IsNumber()
  percentageRefund: number;
}

export class LeadResource {
  @IsNumber()
  budget: number;

  @IsIn(["1-3", "3-6", "6-12"])
  duration: string;

  @IsIn(["URGENT", "HIGH", "MEDIUM", "LOW"])
  urgency: string;
}

export class LeadResponse {
  @IsIn(["REJECT", "HOLD", "PURSUE", "PRIORITY_PURSUE"])
  decision: LeadDecision;
}

export class Lead {
  @ValidateNested()
  @Type(() => LeadBlocker)
  blockers: LeadBlocker;

  @ValidateNested()
  @Type(() => LeadClientInfo)
  clientInfo: LeadClientInfo;

  @ValidateNested()
  @Type(() => LeadResource)
  resource: LeadResource;

  @ValidateNested()
  @Type(() => LeadTermination)
  termination: LeadTermination;
}
