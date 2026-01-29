import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateAlertDto {
  @IsUUID()
  tenantId!: string;

  @IsString()
  @Length(2, 40)
  type!: string;

  @IsString()
  @Length(2, 20)
  level!: string;

  @IsString()
  message!: string;

  @IsOptional()
  @IsString()
  @Length(2, 40)
  relatedEntityType?: string;

  @IsOptional()
  @IsUUID()
  relatedEntityId?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @IsDateString()
  triggeredAt!: string;
}
