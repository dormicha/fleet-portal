import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tenant } from "./tenant.entity";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { UpdateTenantDto } from "./dto/update-tenant.dto";

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepo: Repository<Tenant>
  ) {}

  create(dto: CreateTenantDto) {
    const tenant = this.tenantsRepo.create(dto);
    return this.tenantsRepo.save(tenant);
  }

  findAll(tenantId: string) {
    return this.tenantsRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const tenant = await this.tenantsRepo.findOne({ where: { id, tenantId } });
    if (!tenant) {
      throw new NotFoundException("Tenant not found");
    }
    return tenant;
  }

  async update(id: string, tenantId: string, dto: UpdateTenantDto) {
    const tenant = await this.findOne(id, tenantId);
    Object.assign(tenant, dto);
    return this.tenantsRepo.save(tenant);
  }

  async remove(id: string, tenantId: string) {
    const tenant = await this.findOne(id, tenantId);
    await this.tenantsRepo.remove(tenant);
    return { deleted: true };
  }
}
