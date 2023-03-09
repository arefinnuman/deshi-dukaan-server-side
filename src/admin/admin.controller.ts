import { Delete, Put, Query } from '@nestjs/common';
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
  // Get all admin
  @Get('/admin')
  getAdmin(
    @Query(ValidationPipe) filterDto: GetUserFilterDto,
  ): Promise<Admins[]> {
    return this.adminService.getAdmins(filterDto);
  }
  // Get an admin by id
  @Get('/admin/:id')
  getAdminById(@Param('id', ParseIntPipe) id: number): Promise<Admins> {
    return this.adminService.getAdminById(id);
  }
  // Edit Admin
  @Put('/admin/edit/:id')
  @UsePipes(ValidationPipe)
  editAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Admins> {
    return this.adminService.updateAdmin(id, createUserDto);
  }
  // Delete admin
  @Delete('/admin/delete/:id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.deleteAdmin(id);
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
  // Get an employee by id
  @Get('/employee/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<Employees> {
    return this.adminService.getEmployeeById(id);
  }
  // Delete employee
  @Delete('/employee/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.deleteEmployee(id);
  }

  //  Admin make an Employee to Admin
  @Put('/employee/update-to-admin/:id')
  updateToAdmin(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.adminService.updateToAdmin(id);
  }

  // Update user role manually
  // @Put('/update-user-role/:id')
  // updateUserRole(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('role', RoleValidationPipe) role: UserRole,
  // ): Promise<any> {
  //   return this.adminService.updateUserRole(id, role);
  // }
}
