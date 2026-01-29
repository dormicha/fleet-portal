import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(2, 40)
  type?: string;

  @IsOptional()
  @IsString()
  @Length(6, 240)
  url?: string;

  @IsOptional()
  @IsString()
  @Length(2, 40)
  relatedEntityType?: string;

  @IsOptional()
  @IsUUID()
  relatedEntityId?: string;
}
