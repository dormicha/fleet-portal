import { IsUUID } from "class-validator";

export class TenantQueryDto {
  @IsUUID()
  tenantId!: string;
}
