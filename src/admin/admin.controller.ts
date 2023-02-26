import { Query } from '@nestjs/common';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/users.entity';
import { UserRole } from './enum/user-role.enum';
import { RoleValidationPipe } from './pipes/role-validation.pipes';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Create User
  @Post('/create-user')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.adminService.createUser(createUserDto);
  }

  @Get()
  getUser(
    @Query(ValidationPipe) filterDto: GetUserFilterDto,
  ): Promise<UserEntity[]> {
    return this.adminService.getUsers(filterDto);
  }

  // Get an user by id
  @Get('/user/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.adminService.getUserById(id);
  }

  // Get all Admin
  @Get('/all-admin')
  getAdmin(): Promise<UserEntity[]> {
    return this.adminService.getAllAdmin();
  }
  // Get all Employee
  @Get('/all-employee')
  getEmployee(): Promise<UserEntity[]> {
    return this.adminService.getAllEmployee();
  }
  // Get all Seller
  @Get('/all-seller')
  getSeller(): Promise<UserEntity[]> {
    return this.adminService.getAllSeller();
  }
  // Get all Customer
  @Get('/all-customer')
  getCustomer(): Promise<UserEntity[]> {
    return this.adminService.getAllCustomer();
  }

  // Update user to admin
  @Put('/update-to-admin/:id')
  updateToAdmin(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.updateToAdmin(id);
  }
  // Update user to employee
  @Put('/update-to-employee/:id')
  updateToEmployee(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.updateToEmployee(id);
  }
  // Update user to seller
  @Put('/update-to-seller/:id')
  updateToSeller(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.updateToSeller(id);
  }
  // Update user to customer
  @Put('/update-to-customer/:id')
  updateToCustomer(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.updateToCustomer(id);
  }
  // Update user role manually
  @Put('/update-user-role/:id')
  updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role', RoleValidationPipe) role: UserRole,
  ): Promise<any> {
    return this.adminService.updateUserRole(id, role);
  }

  // Delete user
  @Delete('/delete-user/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.deleteUser(id);
  }
}
