import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";

export class CreateEnergyFuelDto {
  @IsUUID()
  tenantId!: string;

  @IsUUID()
  vehicleId!: string;

  @IsString()
  @Length(2, 20)
  type!: string;

  @IsNumber()
  @Min(0)
  amount!: number;

  @IsOptional()
  @IsString()
  @Length(2, 10)
  unit?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsDateString()
  recordedAt!: string;
}
