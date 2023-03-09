import { Delete, Query } from '@nestjs/common';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { Admins } from './entity/admin.entity';
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Employees } from './entity/Employees.entity';

@Controller('')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Create Admin
  @Post('/create-admin')
  @UsePipes(ValidationPipe)
  createAdmin(@Body() createUserDto: CreateUserDto): Promise<Admins> {
    return this.adminService.createAdmin(createUserDto);
  }

  // Create Employee
  @Post('/create-employee')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<Employees> {
    return this.adminService.createUser(createUserDto);
  }

  @Get('/employee')
  getUser(
    @Query(ValidationPipe) filterDto: GetUserFilterDto,
  ): Promise<Employees[]> {
    return this.adminService.getEmployees(filterDto);
  }

  // Get an user by id
  @Get('/employee/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<Employees> {
    return this.adminService.getEmployeeById(id);
  }

  // Delete user
  @Delete('/employee/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.deleteEmployee(id);
  }

  // Get all Employee
  // @Get('/all-employee')
  // getEmployee(): Promise<Employees[]> {
  //   return this.adminService.getAllEmployee();
  // }

  // // Get all Admin
  // @Get('/all-admin')
  // getAdmin(): Promise<Employees[]> {
  //   return this.adminService.getAllAdmin();
  // }

  // // Get all Seller
  // @Get('/all-seller')
  // getSeller(): Promise<Employees[]> {
  //   return this.adminService.getAllSeller();
  // }
  // // Get all Customer
  // @Get('/all-customer')
  // getCustomer(): Promise<Employees[]> {
  //   return this.adminService.getAllCustomer();
  // }

  // Update user to admin
  // @Put('/update-to-admin/:id')
  // updateToAdmin(@Param('id', ParseIntPipe) id: number): Promise<any> {
  //   return this.adminService.updateToAdmin(id);
  // }
  // // Update user to employee
  // @Put('/update-to-employee/:id')
  // updateToEmployee(@Param('id', ParseIntPipe) id: number): Promise<any> {
  //   return this.adminService.updateToEmployee(id);
  // }
  // // Update user to seller
  // @Put('/update-to-seller/:id')
  // updateToSeller(@Param('id', ParseIntPipe) id: number): Promise<any> {
  //   return this.adminService.updateToSeller(id);
  // }
  // // Update user to customer
  // @Put('/update-to-customer/:id')
  // updateToCustomer(@Param('id', ParseIntPipe) id: number): Promise<any> {
  //   return this.adminService.updateToCustomer(id);
  // }
  // // Update user role manually
  // @Put('/update-user-role/:id')
  // updateUserRole(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('role', RoleValidationPipe) role: UserRole,
  // ): Promise<any> {
  //   return this.adminService.updateUserRole(id, role);
  // }
}
