import { IsArray, IsEmail, IsEnum, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { RoleName } from "../../../common/enums/role-name.enum";

export class CreateUserDto {
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
  @IsArray()
  @IsEnum(RoleName, { each: true })
  roles?: RoleName[];
}
