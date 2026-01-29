import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fault } from "./fault.entity";
import { FaultsController } from "./faults.controller";
import { FaultsService } from "./faults.service";

@Module({
  imports: [TypeOrmModule.forFeature([Fault])],
  controllers: [FaultsController],
  providers: [FaultsService]
})
export class FaultsModule {}
