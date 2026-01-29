import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { RoleName } from "../../../common/enums/role-name.enum";

export class RegisterDto {
  @IsUUID()
  tenantId!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(8, 128)
  password!: string;

  @IsString()
  @Length(2, 120)
  fullName!: string;

  @IsOptional()
  @IsEnum(RoleName)
  role?: RoleName;
}
