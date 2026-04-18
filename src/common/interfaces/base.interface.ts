import { IsOptional, IsString } from "class-validator";

export class BaseUser {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zip?: string;

  @IsString()
  @IsOptional()
  country?: string;
}

export class BaseBooking {
  @IsString()
  status: string;

  @IsString()
  endDate: string;

  @IsString()
  startDate: string;
}
