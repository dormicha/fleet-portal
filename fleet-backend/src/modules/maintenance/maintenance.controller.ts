import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { TenantQueryDto } from "../../common/dto/tenant-query.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { RoleName } from "../../common/enums/role-name.enum";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
import { UpdateMaintenanceDto } from "./dto/update-maintenance.dto";
import { MaintenanceService } from "./maintenance.service";

@Controller("maintenance")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Get()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER, RoleName.DRIVER)
  findAll(@Query() query: TenantQueryDto) {
    return this.maintenanceService.findAll(query.tenantId);
  }

  @Get(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER, RoleName.DRIVER)
  findOne(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.maintenanceService.findOne(id, query.tenantId);
  }

  @Patch(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  update(
    @Param("id") id: string,
    @Query() query: TenantQueryDto,
    @Body() dto: UpdateMaintenanceDto
  ) {
    return this.maintenanceService.update(id, query.tenantId, dto);
  }

  @Delete(":id")
  @Roles(RoleName.SUPER_ADMIN)
  remove(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.maintenanceService.remove(id, query.tenantId);
  }
}
