import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Maintenance } from "./maintenance.entity";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
import { UpdateMaintenanceDto } from "./dto/update-maintenance.dto";

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepo: Repository<Maintenance>
  ) {}

  create(dto: CreateMaintenanceDto) {
    const maintenance = this.maintenanceRepo.create({
      ...dto,
      scheduledAt: new Date(dto.scheduledAt),
      completedAt: dto.completedAt ? new Date(dto.completedAt) : null
    });
    return this.maintenanceRepo.save(maintenance);
  }

  findAll(tenantId: string) {
    return this.maintenanceRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const maintenance = await this.maintenanceRepo.findOne({
      where: { id, tenantId }
    });
    if (!maintenance) {
      throw new NotFoundException("Maintenance not found");
    }
    return maintenance;
  }

  async update(id: string, tenantId: string, dto: UpdateMaintenanceDto) {
    const maintenance = await this.findOne(id, tenantId);
    Object.assign(maintenance, {
      ...dto,
      scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : maintenance.scheduledAt,
      completedAt: dto.completedAt ? new Date(dto.completedAt) : maintenance.completedAt
    });
    return this.maintenanceRepo.save(maintenance);
  }

  async remove(id: string, tenantId: string) {
    const maintenance = await this.findOne(id, tenantId);
    await this.maintenanceRepo.remove(maintenance);
    return { deleted: true };
  }
}
