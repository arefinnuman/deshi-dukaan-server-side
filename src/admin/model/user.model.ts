export interface Users {
  id: string;
  name: string;
  email: string;
  role: userRole;
}

export enum userRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  SELLER = 'seller',
  CUSTOMER = 'customer',
}
