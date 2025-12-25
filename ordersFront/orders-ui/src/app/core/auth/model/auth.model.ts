export type UserRole = 'CLIENT' | 'OPERATOR';

export interface AuthUser {
  role: UserRole;
  name: string;
}
