import { IsEnum, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { RoleName } from "../../../common/enums/role-name.enum";

export class CreateRoleDto {
  @IsUUID()
  tenantId!: string;

  @IsEnum(RoleName)
  name!: RoleName;

  @IsOptional()
  @IsString()
  @Length(2, 120)
  description?: string;
}
