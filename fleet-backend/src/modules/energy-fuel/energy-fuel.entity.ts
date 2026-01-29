import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("energy_fuel")
@Index(["tenantId", "vehicleId"])
export class EnergyFuel extends TenantBaseEntity {
  @Column({ type: "uuid" })
  vehicleId!: string;

  @Column({ type: "varchar", length: 20 })
  type!: string;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: "varchar", length: 10, default: "liter" })
  unit!: string;

  @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
  cost!: number;

  @Column({ type: "timestamptz" })
  recordedAt!: Date;
}
