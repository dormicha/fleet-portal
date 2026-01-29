import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class UpdateDriverDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  fullName?: string;

  @IsOptional()
  @IsString()
  @Length(4, 40)
  licenseNumber?: string;

  @IsOptional()
  @IsString()
  @Length(6, 30)
  phone?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  status?: string;
}
