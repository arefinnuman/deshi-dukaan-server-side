import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './model/user.model';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Create User
  @Post('/create-user')
  createUser(@Body() createUserDto: CreateUserDto): Users {
    return this.adminService.createUser(createUserDto);
  }

  //   Get all Users
  @Get('/all-users')
  getAllUser(): Users[] {
    return this.adminService.getAllUser();
  }

  // Find all Admins
  // FInd all Employees
  // Find all Sellers
  // Find all Customers

  // Find one Admin
  // Find one Employee
  // Find one Seller
  // Find one Customer

  // Make Admin
  // Make Employee
  // Make Seller
}
