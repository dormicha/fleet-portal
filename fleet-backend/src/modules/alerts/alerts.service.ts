import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Alert } from "./alert.entity";
import { CreateAlertDto } from "./dto/create-alert.dto";
import { UpdateAlertDto } from "./dto/update-alert.dto";

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertsRepo: Repository<Alert>
  ) {}

  create(dto: CreateAlertDto) {
    const alert = this.alertsRepo.create({
      ...dto,
      triggeredAt: new Date(dto.triggeredAt)
    });
    return this.alertsRepo.save(alert);
  }

  findAll(tenantId: string) {
    return this.alertsRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const alert = await this.alertsRepo.findOne({ where: { id, tenantId } });
    if (!alert) {
      throw new NotFoundException("Alert not found");
    }
    return alert;
  }

  async update(id: string, tenantId: string, dto: UpdateAlertDto) {
    const alert = await this.findOne(id, tenantId);
    Object.assign(alert, {
      ...dto,
      triggeredAt: dto.triggeredAt ? new Date(dto.triggeredAt) : alert.triggeredAt
    });
    return this.alertsRepo.save(alert);
  }

  async remove(id: string, tenantId: string) {
    const alert = await this.findOne(id, tenantId);
    await this.alertsRepo.remove(alert);
    return { deleted: true };
  }
}
