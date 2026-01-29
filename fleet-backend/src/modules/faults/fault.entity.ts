import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("faults")
@Index(["tenantId", "vehicleId"])
export class Fault extends TenantBaseEntity {
  @Column({ type: "uuid" })
  vehicleId!: string;

  @Column({ type: "varchar", length: 30 })
  severity!: string;

  @Column({ type: "varchar", length: 30, default: "open" })
  status!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "timestamptz" })
  reportedAt!: Date;

  @Column({ type: "timestamptz", nullable: true })
  resolvedAt?: Date | null;
}
