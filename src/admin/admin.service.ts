import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { userRole, Users } from './model/user.model';

@Injectable()
export class AdminService {
  private user: Users[] = [];

  // Create User
  //   createUser(createUserDto: CreateUserDto): Users {
  //     const { name, email, createdAt } = createUserDto;
  //     const user: Users = {
  //       id: uuid.v1(),
  //       name,
  //       email,
  //       createdAt,
  //       role: userRole.CUSTOMER,
  //     };
  //     this.user.push(user);
  //     return user;
  //   }

  // Create User
  createUser(createUserDto: CreateUserDto): Users {
    const { name, email } = createUserDto;
    const user: Users = {
      id: uuid.v1(),
      name,
      email,
      role: userRole.CUSTOMER,
    };
    this.user.push(user);
    return user;
  }
  // Find all Users
  getAllUser(): Users[] {
    return this.user;
  }
}
