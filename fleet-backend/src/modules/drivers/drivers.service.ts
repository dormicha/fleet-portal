import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Driver } from "./driver.entity";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driversRepo: Repository<Driver>
  ) {}

  create(dto: CreateDriverDto) {
    const driver = this.driversRepo.create(dto);
    return this.driversRepo.save(driver);
  }

  findAll(tenantId: string) {
    return this.driversRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const driver = await this.driversRepo.findOne({ where: { id, tenantId } });
    if (!driver) {
      throw new NotFoundException("Driver not found");
    }
    return driver;
  }

  async update(id: string, tenantId: string, dto: UpdateDriverDto) {
    const driver = await this.findOne(id, tenantId);
    Object.assign(driver, dto);
    return this.driversRepo.save(driver);
  }

  async remove(id: string, tenantId: string) {
    const driver = await this.findOne(id, tenantId);
    await this.driversRepo.remove(driver);
    return { deleted: true };
  }
}
