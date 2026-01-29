import { Column, Entity, Index } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";

@Entity("documents")
@Index(["tenantId", "uploadedByUserId"])
export class Document extends TenantBaseEntity {
  @Column({ type: "varchar", length: 120 })
  title!: string;

  @Column({ type: "varchar", length: 40 })
  type!: string;

  @Column({ type: "varchar", length: 240 })
  url!: string;

  @Column({ type: "varchar", length: 40, nullable: true })
  relatedEntityType?: string;

  @Column({ type: "uuid", nullable: true })
  relatedEntityId?: string;

  @Column({ type: "uuid" })
  uploadedByUserId!: string;
}
