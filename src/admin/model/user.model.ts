export interface Users {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  SELLER = 'seller',
  CUSTOMER = 'customer',
}
