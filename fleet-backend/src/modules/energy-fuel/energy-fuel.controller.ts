import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { TenantQueryDto } from "../../common/dto/tenant-query.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { RoleName } from "../../common/enums/role-name.enum";
import { CreateEnergyFuelDto } from "./dto/create-energy-fuel.dto";
import { UpdateEnergyFuelDto } from "./dto/update-energy-fuel.dto";
import { EnergyFuelService } from "./energy-fuel.service";

@Controller("energy")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnergyFuelController {
  constructor(private readonly energyService: EnergyFuelService) {}

  @Post()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  create(@Body() dto: CreateEnergyFuelDto) {
    return this.energyService.create(dto);
  }

  @Get()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER, RoleName.DRIVER)
  findAll(@Query() query: TenantQueryDto) {
    return this.energyService.findAll(query.tenantId);
  }

  @Get(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER, RoleName.DRIVER)
  findOne(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.energyService.findOne(id, query.tenantId);
  }

  @Patch(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  update(
    @Param("id") id: string,
    @Query() query: TenantQueryDto,
    @Body() dto: UpdateEnergyFuelDto
  ) {
    return this.energyService.update(id, query.tenantId, dto);
  }

  @Delete(":id")
  @Roles(RoleName.SUPER_ADMIN)
  remove(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.energyService.remove(id, query.tenantId);
  }
}
