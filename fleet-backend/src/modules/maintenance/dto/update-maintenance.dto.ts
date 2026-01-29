import { IsDateString, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class UpdateMaintenanceDto {
  @IsOptional()
  @IsString()
  @Length(2, 60)
  type?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
