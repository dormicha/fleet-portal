import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateDocumentDto {
  @IsUUID()
  tenantId!: string;

  @IsString()
  @Length(2, 120)
  title!: string;

  @IsString()
  @Length(2, 40)
  type!: string;

  @IsString()
  @Length(6, 240)
  url!: string;

  @IsOptional()
  @IsString()
  @Length(2, 40)
  relatedEntityType?: string;

  @IsOptional()
  @IsUUID()
  relatedEntityId?: string;

  @IsUUID()
  uploadedByUserId!: string;
}
