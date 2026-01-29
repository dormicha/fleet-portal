import { IsDateString, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class UpdateEnergyFuelDto {
  @IsOptional()
  @IsString()
  @Length(2, 20)
  type?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;

  @IsOptional()
  @IsString()
  @Length(2, 10)
  unit?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @IsOptional()
  @IsDateString()
  recordedAt?: string;
}
