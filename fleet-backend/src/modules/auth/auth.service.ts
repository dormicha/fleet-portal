import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { RegisterDto } from "./dto/register.dto";
import { RoleName } from "../../common/enums/role-name.enum";
import { User } from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  async register(dto: RegisterDto) {
    const created = await this.usersService.create({
      tenantId: dto.tenantId,
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
      roles: dto.role ? [dto.role] : [RoleName.DRIVER]
    });
    return this.issueTokens(created);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email, dto.tenantId);
    if (!user || !(await this.usersService.validatePassword(user, dto.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const tokens = await this.issueTokens(user);
    await this.usersService.setRefreshToken(user.id, user.tenantId, tokens.refreshToken);
    return tokens;
  }

  async refresh(dto: RefreshDto) {
    const payload = await this.jwtService.verifyAsync(dto.refreshToken, {
      secret: this.config.get<string>("JWT_REFRESH_SECRET")
    });
    const user = await this.usersService.findOne(payload.sub, payload.tenantId);
    if (!user.refreshTokenHash) {
      throw new UnauthorizedException("No refresh token");
    }
    const match = await bcrypt.compare(dto.refreshToken, user.refreshTokenHash);
    if (!match) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    const tokens = await this.issueTokens(user);
    await this.usersService.setRefreshToken(user.id, user.tenantId, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string, tenantId: string) {
    await this.usersService.clearRefreshToken(userId, tenantId);
    return { loggedOut: true };
  }

  private async issueTokens(user: User) {
    const roles = user.roles?.map((role) => role.name) ?? [];
    const payload = {
      sub: user.id,
      tenantId: user.tenantId,
      roles,
      email: user.email
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>("JWT_ACCESS_SECRET"),
      expiresIn: this.config.get<string>("JWT_ACCESS_EXPIRES_IN", "15m")
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.config.get<string>("JWT_REFRESH_EXPIRES_IN", "7d")
    });

    return { accessToken, refreshToken };
  }
}
