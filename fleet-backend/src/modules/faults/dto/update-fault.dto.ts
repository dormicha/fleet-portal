import { IsDateString, IsOptional, IsString, Length } from "class-validator";

export class UpdateFaultDto {
  @IsOptional()
  @IsString()
  @Length(2, 30)
  severity?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  status?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  reportedAt?: string;

  @IsOptional()
  @IsDateString()
  resolvedAt?: string;
}
