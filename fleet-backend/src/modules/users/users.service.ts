import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "../roles/roles.service";
import { RoleName } from "../../common/enums/role-name.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly dataSource: DataSource
  ) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const roleNames = dto.roles?.length ? dto.roles : [RoleName.DRIVER];
    const roles = await this.rolesService.ensureRoles(dto.tenantId, roleNames);

    return this.dataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User);
      const user = userRepo.create({
        tenantId: dto.tenantId,
        email: dto.email.toLowerCase(),
        fullName: dto.fullName,
        passwordHash,
        roles
      });
      return userRepo.save(user);
    });
  }

  findAll(tenantId: string) {
    return this.usersRepo.find({ where: { tenantId } });
  }

  async findOne(id: string, tenantId: string) {
    const user = await this.usersRepo.findOne({ where: { id, tenantId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findByEmail(email: string, tenantId: string) {
    return this.usersRepo.findOne({
      where: { email: email.toLowerCase(), tenantId }
    });
  }

  async update(id: string, tenantId: string, dto: UpdateUserDto) {
    const user = await this.findOne(id, tenantId);
    if (dto.password) {
      user.passwordHash = await bcrypt.hash(dto.password, 10);
    }
    if (dto.roles) {
      user.roles = await this.rolesService.findByNames(tenantId, dto.roles);
    }
    if (dto.email) {
      user.email = dto.email.toLowerCase();
    }
    if (dto.fullName) {
      user.fullName = dto.fullName;
    }
    return this.usersRepo.save(user);
  }

  async remove(id: string, tenantId: string) {
    const user = await this.findOne(id, tenantId);
    await this.usersRepo.remove(user);
    return { deleted: true };
  }

  async setRefreshToken(userId: string, tenantId: string, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    await this.usersRepo.update(
      { id: userId, tenantId },
      { refreshTokenHash: hash }
    );
  }

  async clearRefreshToken(userId: string, tenantId: string) {
    await this.usersRepo.update(
      { id: userId, tenantId },
      { refreshTokenHash: null }
    );
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.passwordHash);
  }
}
