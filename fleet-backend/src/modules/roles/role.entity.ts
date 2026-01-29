import { Column, Entity, Index, ManyToMany } from "typeorm";
import { TenantBaseEntity } from "../../common/entities/tenant-base.entity";
import { RoleName } from "../../common/enums/role-name.enum";
import { User } from "../users/user.entity";

@Entity("roles")
@Index(["tenantId", "name"], { unique: true })
export class Role extends TenantBaseEntity {
  @Column({ type: "varchar", length: 40 })
  name!: RoleName;

  @Column({ type: "varchar", length: 120, nullable: true })
  description?: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];
}
