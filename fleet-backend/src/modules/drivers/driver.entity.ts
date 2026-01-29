import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("drivers")
@Index(["tenantId", "licenseNumber"], { unique: true })
export class Driver extends TenantBaseEntity {
  @Column({ type: "varchar", length: 120 })
  fullName!: string;

  @Column({ type: "varchar", length: 40 })
  licenseNumber!: string;

  @Column({ type: "varchar", length: 30, nullable: true })
  phone?: string;

  @Column({ type: "uuid", nullable: true })
  userId?: string | null;

  @Column({ type: "varchar", length: 30, default: "active" })
  status!: string;
}
