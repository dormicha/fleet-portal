import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";

export class CreateMaintenanceDto {
  @IsUUID()
  tenantId!: string;

  @IsUUID()
  vehicleId!: string;

  @IsString()
  @Length(2, 60)
  type!: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsDateString()
  scheduledAt!: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
