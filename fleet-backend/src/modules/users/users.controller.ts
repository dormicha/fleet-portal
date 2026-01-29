import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { TenantQueryDto } from "../../common/dto/tenant-query.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { RoleName } from "../../common/enums/role-name.enum";
import { RequestUser } from "../../common/types/request-user.type";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER, RoleName.DRIVER)
  getMe(@Req() req: { user: RequestUser }) {
    return this.usersService.findOne(req.user.sub, req.user.tenantId);
  }

  @Post()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  findAll(@Query() query: TenantQueryDto) {
    return this.usersService.findAll(query.tenantId);
  }

  @Get(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  findOne(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.usersService.findOne(id, query.tenantId);
  }

  @Patch(":id")
  @Roles(RoleName.SUPER_ADMIN, RoleName.FLEET_MANAGER)
  update(
    @Param("id") id: string,
    @Query() query: TenantQueryDto,
    @Body() dto: UpdateUserDto
  ) {
    return this.usersService.update(id, query.tenantId, dto);
  }

  @Delete(":id")
  @Roles(RoleName.SUPER_ADMIN)
  remove(@Param("id") id: string, @Query() query: TenantQueryDto) {
    return this.usersService.remove(id, query.tenantId);
  }
}
