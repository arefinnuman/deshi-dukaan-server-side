import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserRole, Users } from './model/user.model';
import { RoleValidationPipe } from './pipes/role-validation.pipes';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Create User
  @Post('/create-user')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Users {
    return this.adminService.createUser(createUserDto);
  }
  // Get Users
  @Get('/all-users')
  getUser(@Query(ValidationPipe) filterDto: GetUserFilterDto): Users[] {
    if (Object.keys(filterDto).length) {
      return this.adminService.getUserWithFilters(filterDto);
    } else {
      return this.adminService.getAllUser();
    }
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
  // Update user role manually
  @Put('/update-user-role/:id')
  updateUserRole(
    @Param('id') id: string,
    @Body('role', RoleValidationPipe) role: UserRole,
  ): Users {
    return this.adminService.updateUserRole(id, role);
  }

  // Delete user
  @Delete('/delete-user/:id')
  deleteUser(@Param('id') id: string): void {
    return this.adminService.deleteUser(id);
  }
}
