import { IsDateString, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateFaultDto {
  @IsUUID()
  tenantId!: string;

  @IsUUID()
  vehicleId!: string;

  @IsString()
  @Length(2, 30)
  severity!: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  status?: string;

  @IsString()
  description!: string;

  @IsDateString()
  reportedAt!: string;

  @IsOptional()
  @IsDateString()
  resolvedAt?: string;
}
