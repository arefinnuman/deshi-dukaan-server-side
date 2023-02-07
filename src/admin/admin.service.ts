import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole, Users } from './model/user.model';

@Injectable()
export class AdminService {
  private user: Users[] = [];

  // Create User
  createUser(createUserDto: CreateUserDto): Users {
    const { name, email } = createUserDto;
    const user: Users = {
      id: uuid.v1(),
      name,
      email,
      role: UserRole.CUSTOMER,
    };
    this.user.push(user);
    return user;
  }

  // get all Users
  getAllUser(): Users[] {
    return this.user;
  }
  // get an user by id
  getUserById(id: string): Users {
    const found = this.user.find((user) => user.id === id);
    if (!found) {
      throw new NotFoundException(`User with Id '${id}' not found`);
    }
    return found;
  }

  // get only admin
  getAllAdmin(): Users[] {
    return this.user.filter((user) => user.role === UserRole.ADMIN);
  }
  // get only employee
  getAllEmployee(): Users[] {
    return this.user.filter((user) => user.role === UserRole.EMPLOYEE);
  }
  // get only seller
  getAllSeller(): Users[] {
    return this.user.filter((user) => user.role === UserRole.SELLER);
  }
  // get only customer
  getAllCustomer(): Users[] {
    return this.user.filter((user) => user.role === UserRole.CUSTOMER);
  }

  // update user to admin
  updateToAdmin(id: string): Users {
    const user = this.getUserById(id);
    user.role = UserRole.ADMIN;
    return user;
  }
  // update user to employee
  updateToEmployee(id: string): Users {
    const user = this.getUserById(id);
    user.role = UserRole.EMPLOYEE;
    return user;
  }
  // update user to seller
  updateToSeller(id: string): Users {
    const user = this.getUserById(id);
    user.role = UserRole.SELLER;
    return user;
  }
  // update user to customer
  updateToCustomer(id: string): Users {
    const user = this.getUserById(id);
    user.role = UserRole.CUSTOMER;
    return user;
  }

  // delete user
  deleteUser(id: string): void {
    const found = this.getUserById(id);
    this.user = this.user.filter((user) => user.id !== found.id);
  }
}
