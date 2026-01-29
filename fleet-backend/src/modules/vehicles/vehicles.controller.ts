import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { TenantQueryDto } from "../../common/dto/tenant-query.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { RoleName } from "../../common/enums/role-name.enum";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { VehiclesService } from "./vehicles.service";

@Controller("vehicles")
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  create(@Body() dto: CreateVehicleDto) {
    return this.vehiclesService.create(dto);
  }

  @Get()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER, RoleName.DRIVER)
  findAll(@Query() query: TenantQueryDto) {
    return this.vehiclesService.findAll(query.tenantId);
  }

  @Get(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER, RoleName.DRIVER)
  findOne(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.vehiclesService.findOne(id, query.tenantId);
  }

  @Patch(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  update(
    @Param("id") id: string,
    @Query() query: TenantQueryDto,
    @Body() dto: UpdateVehicleDto
  ) {
    return this.vehiclesService.update(id, query.tenantId, dto);
  }

  @Delete(":id")
  @Roles(RoleName.SUPER_ADMIN)
  remove(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.vehiclesService.remove(id, query.tenantId);
  }
}
