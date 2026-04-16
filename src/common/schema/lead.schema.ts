import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class TerminationInfo {
  @IsNumber()
  percentageRefund: number;
}

export class RequirementsInfo {
  @IsNumber()
  budget: number;

  @IsNumber()
  timeFrame: number;

  @IsArray()
  @IsString({ each: true })
  desires: string[];
}

export class BlockersInfo {
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

export class InfluencerInfo {
  @IsString()
  name: string;

  @IsString()
  position: string;
}

export class AuthorityInfo {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InfluencerInfo)
  activeInfluencers: InfluencerInfo[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InfluencerInfo)
  stakeHolders: InfluencerInfo[];
}

export class ClientInfo {
  @IsString()
  location: string;

  @IsString()
  industry: string;

  @IsNumber()
  companySize: number;

  @ValidateNested()
  @Type(() => AuthorityInfo)
  authority: AuthorityInfo;

  @IsString()
  intelletualProperty: string;
}

export class LeadInput {
  @ValidateNested()
  @Type(() => TerminationInfo)
  termination: TerminationInfo;

  @ValidateNested()
  @Type(() => RequirementsInfo)
  requirements: RequirementsInfo;

  @ValidateNested()
  @Type(() => BlockersInfo)
  blockers: BlockersInfo;

  @ValidateNested()
  @Type(() => ClientInfo)
  clientInfo: ClientInfo;
}
