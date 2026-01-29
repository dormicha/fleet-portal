import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("tenants")
@Index(["tenantId", "name"], { unique: true })
export class Tenant extends TenantBaseEntity {
  @Column({ type: "varchar", length: 120 })
  name!: string;

  @Column({ type: "varchar", length: 40, default: "active" })
  status!: string;
}
