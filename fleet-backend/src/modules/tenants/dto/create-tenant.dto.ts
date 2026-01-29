import { IsString, IsUUID, Length } from "class-validator";

export class CreateTenantDto {
  @IsUUID()
  tenantId!: string;

  @IsString()
  @Length(2, 120)
  name!: string;
}
