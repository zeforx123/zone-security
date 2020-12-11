export type Roles = 'EMPLOYEE' | 'ADMIN';

export interface User {
  uid: string;
  email: string;
  role?: Roles;
}
