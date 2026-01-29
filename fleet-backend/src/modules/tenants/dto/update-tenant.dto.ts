import { IsOptional, IsString, Length } from "class-validator";

export class UpdateTenantDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 40)
  status?: string;
}
