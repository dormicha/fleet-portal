import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("maintenance")
@Index(["tenantId", "vehicleId"])
export class Maintenance extends TenantBaseEntity {
  @Column({ type: "uuid" })
  vehicleId!: string;

  @Column({ type: "varchar", length: 60 })
  type!: string;

  @Column({ type: "varchar", length: 30, default: "scheduled" })
  status!: string;

  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  cost!: number;

  @Column({ type: "timestamptz" })
  scheduledAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  completedAt?: Date | null;

  @Column({ type: "text", nullable: true })
  notes?: string;
}
