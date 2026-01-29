import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("alerts")
@Index(["tenantId", "triggeredAt"])
export class Alert extends TenantBaseEntity {
  @Column({ type: "varchar", length: 40 })
  type!: string;

  @Column({ type: "varchar", length: 20 })
  level!: string;

  @Column({ type: "text" })
  message!: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  relatedEntityType?: string;

  @Column({ type: "uuid", nullable: true })
  relatedEntityId?: string;

  @Column({ type: "boolean", default: false })
  isRead!: boolean;

  @Column({ type: "timestamptz" })
  triggeredAt!: Date;
}
