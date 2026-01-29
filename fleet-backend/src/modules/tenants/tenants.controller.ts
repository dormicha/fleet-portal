import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { TenantQueryDto } from "../../common/dto/tenant-query.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { RoleName } from "../../common/enums/role-name.enum";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { UpdateTenantDto } from "./dto/update-tenant.dto";
import { TenantsService } from "./tenants.service";

@Controller("tenants")
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @Roles(RoleName.SUPER_ADMIN)
  create(@Body() dto: CreateTenantDto) {
    return this.tenantsService.create(dto);
  }

  @Get()
  @Roles(RoleName.SUPER_ADMIN)
  findAll(@Query() query: TenantQueryDto) {
    return this.tenantsService.findAll(query.tenantId);
  }

  @Get(":id")
  @Roles(RoleName.SUPER_ADMIN)
  findOne(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.tenantsService.findOne(id, query.tenantId);
  }

  @Patch(":id")
  @Roles(RoleName.SUPER_ADMIN)
  update(
    @Param("id") id: string,
    @Query() query: TenantQueryDto,
    @Body() dto: UpdateTenantDto
  ) {
    return this.tenantsService.update(id, query.tenantId, dto);
  }

  @Delete(":id")
  @Roles(RoleName.SUPER_ADMIN)
  remove(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.tenantsService.remove(id, query.tenantId);
  }
}
