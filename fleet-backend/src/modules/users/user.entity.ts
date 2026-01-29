import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";
import { Role } from "../roles/role.entity";

@Entity("users")
@Index(["tenantId", "email"], { unique: true })
export class User extends TenantBaseEntity {
  @Column({ type: "varchar", length: 120 })
  email!: string;

  @Column({ type: "varchar", length: 120 })
  fullName!: string;

  @Column({ type: "varchar", length: 120 })
  passwordHash!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "varchar", length: 240, nullable: true })
  refreshTokenHash?: string | null;

  @Column({ type: "timestamptz", nullable: true })
  lastLoginAt?: Date | null;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({
    name: "user_roles",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" }
  })
  roles!: Role[];
}
