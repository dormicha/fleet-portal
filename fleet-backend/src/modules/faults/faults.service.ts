import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Fault } from "./fault.entity";
import { CreateFaultDto } from "./dto/create-fault.dto";
import { UpdateFaultDto } from "./dto/update-fault.dto";

@Injectable()
export class FaultsService {
  constructor(
    @InjectRepository(Fault)
    private readonly faultsRepo: Repository<Fault>
  ) {}

  create(dto: CreateFaultDto) {
    const fault = this.faultsRepo.create({
      ...dto,
      reportedAt: new Date(dto.reportedAt),
      resolvedAt: dto.resolvedAt ? new Date(dto.resolvedAt) : null
    });
    return this.faultsRepo.save(fault);
  }

  findAll(tenantId: string) {
    return this.faultsRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const fault = await this.faultsRepo.findOne({ where: { id, tenantId } });
    if (!fault) {
      throw new NotFoundException("Fault not found");
    }
    return fault;
  }

  async update(id: string, tenantId: string, dto: UpdateFaultDto) {
    const fault = await this.findOne(id, tenantId);
    Object.assign(fault, {
      ...dto,
      reportedAt: dto.reportedAt ? new Date(dto.reportedAt) : fault.reportedAt,
      resolvedAt: dto.resolvedAt ? new Date(dto.resolvedAt) : fault.resolvedAt
    });
    return this.faultsRepo.save(fault);
  }

  async remove(id: string, tenantId: string) {
    const fault = await this.findOne(id, tenantId);
    await this.faultsRepo.remove(fault);
    return { deleted: true };
  }
}
