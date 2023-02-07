import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './model/user.model';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Create User
  @Post('/create-user')
  createUser(@Body() createUserDto: CreateUserDto): Users {
    return this.adminService.createUser(createUserDto);
  }
  // Get all Users
  @Get('/all-users')
  getAllUser(): Users[] {
    return this.adminService.getAllUser();
  }
  // Get an user by id
  @Get('/user/:id')
  getUserById(@Param('id') id: string): Users {
    return this.adminService.getUserById(id);
  }

  // Get all Admin
  @Get('/all-admin')
  getAdmin(): Users[] {
    return this.adminService.getAllAdmin();
  }
  // Get all Employee
  @Get('/all-employee')
  getEmployee(): Users[] {
    return this.adminService.getAllEmployee();
  }
  // Get all Seller
  @Get('/all-seller')
  getSeller(): Users[] {
    return this.adminService.getAllSeller();
  }
  // Get all Customer
  @Get('/all-customer')
  getCustomer(): Users[] {
    return this.adminService.getAllCustomer();
  }

  // Update user to admin
  @Put('/update-to-admin/:id')
  updateToAdmin(@Param('id') id: string): Users {
    return this.adminService.updateToAdmin(id);
  }
  // Update user to employee
  @Put('/update-to-employee/:id')
  updateToEmployee(@Param('id') id: string): Users {
    return this.adminService.updateToEmployee(id);
  }
  // Update user to seller
  @Put('/update-to-seller/:id')
  updateToSeller(@Param('id') id: string): Users {
    return this.adminService.updateToSeller(id);
  }
  // Update user to customer
  @Put('/update-to-customer/:id')
  updateToCustomer(@Param('id') id: string): Users {
    return this.adminService.updateToCustomer(id);
  }

  // Delete user
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string): void {
    return this.adminService.deleteUser(id);
  }
}
