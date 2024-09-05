export type Permission = 'admin' | 'user' | 'guest';

export interface AuthUser {
  email: string;
  token: string,
  permission: Permission
}
