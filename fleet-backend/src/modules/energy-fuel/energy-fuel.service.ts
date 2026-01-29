import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EnergyFuel } from "./energy-fuel.entity";
import { CreateEnergyFuelDto } from "./dto/create-energy-fuel.dto";
import { UpdateEnergyFuelDto } from "./dto/update-energy-fuel.dto";

@Injectable()
export class EnergyFuelService {
  constructor(
    @InjectRepository(EnergyFuel)
    private readonly energyRepo: Repository<EnergyFuel>
  ) {}

  create(dto: CreateEnergyFuelDto) {
    const energy = this.energyRepo.create({
      ...dto,
      recordedAt: new Date(dto.recordedAt)
    });
    return this.energyRepo.save(energy);
  }

  findAll(tenantId: string) {
    return this.energyRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const entry = await this.energyRepo.findOne({ where: { id, tenantId } });
    if (!entry) {
      throw new NotFoundException("Energy/Fuel entry not found");
    }
    return entry;
  }

  async update(id: string, tenantId: string, dto: UpdateEnergyFuelDto) {
    const entry = await this.findOne(id, tenantId);
    Object.assign(entry, {
      ...dto,
      recordedAt: dto.recordedAt ? new Date(dto.recordedAt) : entry.recordedAt
    });
    return this.energyRepo.save(entry);
  }

  async remove(id: string, tenantId: string) {
    const entry = await this.findOne(id, tenantId);
    await this.energyRepo.remove(entry);
    return { deleted: true };
  }
}
