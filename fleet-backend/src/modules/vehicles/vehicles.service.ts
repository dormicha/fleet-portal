import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vehicle } from "./vehicle.entity";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepo: Repository<Vehicle>
  ) {}

  create(dto: CreateVehicleDto) {
    const vehicle = this.vehiclesRepo.create(dto);
    return this.vehiclesRepo.save(vehicle);
  }

  findAll(tenantId: string) {
    return this.vehiclesRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const vehicle = await this.vehiclesRepo.findOne({ where: { id, tenantId } });
    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }
    return vehicle;
  }

  async update(id: string, tenantId: string, dto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id, tenantId);
    Object.assign(vehicle, dto);
    return this.vehiclesRepo.save(vehicle);
  }

  async remove(id: string, tenantId: string) {
    const vehicle = await this.findOne(id, tenantId);
    await this.vehiclesRepo.remove(vehicle);
    return { deleted: true };
  }
}
