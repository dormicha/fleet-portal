import { IsInt, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";

export class CreateVehicleDto {
  @IsUUID()
  tenantId!: string;

  @IsString()
  @Length(2, 20)
  plateNumber!: string;

  @IsOptional()
  @IsString()
  @Length(4, 40)
  vin?: string;

  @IsOptional()
  @IsString()
  @Length(2, 80)
  model?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  odometer?: number;

  @IsOptional()
  @IsUUID()
  driverId?: string;
}
