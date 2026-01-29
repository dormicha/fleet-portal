import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Role } from "./role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleName } from "../../common/enums/role-name.enum";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>
  ) {}

  create(dto: CreateRoleDto) {
    const role = this.rolesRepo.create(dto);
    return this.rolesRepo.save(role);
  }

  findAll(tenantId: string) {
    return this.rolesRepo.find({ where: { tenantId } });
  }

  findByNames(tenantId: string, names: RoleName[]) {
    return this.rolesRepo.find({
      where: { tenantId, name: In(names) }
    });
  }

  async ensureRoles(tenantId: string, names: RoleName[]) {
    const existing = await this.findByNames(tenantId, names);
    const existingNames = new Set(existing.map((role) => role.name));
    const missing = names.filter((name) => !existingNames.has(name));

    if (missing.length > 0) {
      const created = missing.map((name) =>
        this.rolesRepo.create({ tenantId, name })
      );
      await this.rolesRepo.save(created);
    }

    return this.findByNames(tenantId, names);
  }
}
