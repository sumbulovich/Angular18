export type Permission = 'admin' | 'user' | 'guest';

export interface AuthUser {
  _id?: string;
  email: string;
  password?: string,
  permission: Permission
}
