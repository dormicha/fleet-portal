import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnergyFuel } from "./energy-fuel.entity";
import { EnergyFuelController } from "./energy-fuel.controller";
import { EnergyFuelService } from "./energy-fuel.service";

@Module({
  imports: [TypeOrmModule.forFeature([EnergyFuel])],
  controllers: [EnergyFuelController],
  providers: [EnergyFuelService]
})
export class EnergyFuelModule {}
