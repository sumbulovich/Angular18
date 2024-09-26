export type Permission = 'admin' | 'user' | 'guest';

export interface AuthUser {
  email?: string;
  permission?: Permission;
  name?: string;
  lastName?: string;
  password?: string;
  token?: string;
  expiration?: number;
}
