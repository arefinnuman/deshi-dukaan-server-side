export interface Users {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}
