import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("vehicles")
@Index(["tenantId", "plateNumber"], { unique: true })
export class Vehicle extends TenantBaseEntity {
  @Column({ type: "varchar", length: 20 })
  plateNumber!: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  vin?: string;

  @Column({ type: "varchar", length: 80, nullable: true })
  model?: string;

  @Column({ type: "varchar", length: 30, default: "active" })
  status!: string;

  @Column({ type: "int", default: 0 })
  odometer!: number;

  @Column({ type: "uuid", nullable: true })
  driverId?: string | null;

  @Column({ type: "timestamptz", nullable: true })
  lastServiceAt?: Date | null;
}
