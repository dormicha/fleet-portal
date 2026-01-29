import { RoleName } from "../enums/role-name.enum";

export interface RequestUser {
  sub: string;
  tenantId: string;
  roles: RoleName[];
  email: string;
}
