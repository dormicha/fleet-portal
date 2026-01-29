import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class UpdateAlertDto {
  @IsOptional()
  @IsString()
  @Length(2, 40)
  type?: string;

  @IsOptional()
  @IsString()
  @Length(2, 20)
  level?: string;

  @IsOptional()
  @IsString()
  message?: string;

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

  @IsOptional()
  @IsDateString()
  triggeredAt?: string;
}
