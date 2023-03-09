import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { Admins } from './entity/admin.entity';
import { Employees } from './entity/employees.entity';
import { UserRole } from './enum/user-role.enum';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admins)
    private adminRepository: Repository<Admins>,

    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
  ) {}

  // This is the service for code, which is in the controller

  // Admin create , get all admin, get admin by id, delete admin, search admin by name or email
  // Admin can create an Admin
  async createAdmin(createUserDto: CreateUserDto): Promise<Admins> {
    const { email, password, username, firstname, lastname, address, phone } =
      createUserDto;
    const user = new Admins();
    user.email = email;
    user.password = password;
    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.address = address;
    user.phone = phone;
    user.role = UserRole.ADMIN;
    await user.save();

    return user;
  }
  // get an Admin by id
  async getAdminById(id: number): Promise<Admins> {
    const found = await this.adminRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with Id '${id}' not found`);
    }
    return found;
  }
  // Get all admin
  getAllAdmin(): Promise<Admins[]> {
    return this.adminRepository.find();
  }
  // Search Admin by name or email
  async getAdmins(filterDto: GetUserFilterDto): Promise<Admins[]> {
    const { search, role } = filterDto;
    const query = this.adminRepository.createQueryBuilder('admin');

    if (role) {
      query.andWhere('admin.role = :role', { role });
    }

    if (search) {
      query.andWhere(
        '(admin.firstname LIKE :search OR admin.lastname LIKE :search OR admin.email LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const admins = await query.getMany();
    return admins;
  }
  // Edit admin information by id
  async updateAdmin(id: number, createUserDto: CreateUserDto): Promise<Admins> {
    const { email, password, username, firstname, lastname, address, phone } =
      createUserDto;
    const user = await this.getAdminById(id);
    user.email = email;
    user.password = password;
    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.address = address;
    user.phone = phone;
    await user.save();
    return user;
  }
  // Delete an Admin
  async deleteAdmin(id: number): Promise<any> {
    const admin = await this.getAdminById(id);
    await admin.remove();
    return admin;
  }

  // Employee create , get all employee, get employee by id, delete employee, search employee by name or email
  // Admin can create an Employee
  async createUser(createUserDto: CreateUserDto): Promise<Employees> {
    const { email, password, username, firstname, lastname, address, phone } =
      createUserDto;
    const user = new Employees();
    user.email = email;
    user.password = password;
    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.address = address;
    user.phone = phone;
    user.role = UserRole.EMPLOYEE;
    await user.save();
    return user;
  }
  // get an Employee by id
  async getEmployeeById(id: number): Promise<Employees> {
    const found = await this.employeeRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with Id '${id}' not found`);
    }
    return found;
  }
  // get all Employees
  getAllEmployee(): Promise<Employees[]> {
    return this.employeeRepository.find();
  }
  // Search Employees by name or email
  async getEmployees(filterDto: GetUserFilterDto): Promise<Employees[]> {
    const { search, role } = filterDto;
    const query = this.employeeRepository.createQueryBuilder('user');
    if (search) {
      query.andWhere('(user.name LIKE :search OR user.email LIKE :search)', {
        search: `%${search}%`,
      });
    }
    if (role) {
      query.andWhere('user.role = :role', { role });
    }
    const employees = await query.getMany();
    return employees;
  }
  // Edit Employee Information by id
  async editEmployee(
    id: number,
    CreateUserDto: CreateUserDto,
  ): Promise<Employees> {
    const { email, password, username, firstname, lastname, address, phone } =
      CreateUserDto;
    const user = await this.getEmployeeById(id);
    user.email = email;
    user.password = password;
    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.address = address;
    user.phone = phone;
    await user.save();
    return user;
  }
  // delete Employee
  async deleteEmployee(id: number): Promise<any> {
    const employee = await this.getEmployeeById(id);
    await employee.remove();
    return employee;
  }

  //----------------------------------------------------//

  // get only employee
  // getAllEmployee(): Promise<Employees[]> {
  //   return this.employeeRepository.find({
  //     where: { role: UserRole.EMPLOYEE },
  //   });
  // }
  // get only admin
  // getAllAdmin(): Promise<Employees[]> {
  //   return this.employeeRepository.find({
  //     where: { role: UserRole.ADMIN },
  //   });
  // }
  // get only seller
  // getAllSeller(): Promise<Employees[]> {
  //   return this.employeeRepository.find({
  //     where: { role: UserRole.SELLER },
  //   });
  // }
  // get only customer
  // getAllCustomer(): Promise<Employees[]> {
  //   return this.employeeRepository.find({
  //     where: { role: UserRole.CUSTOMER },
  //   });
  // }
  // Update user to Admin
  // async updateToAdmin(id: number): Promise<any> {
  //   const user = await this.getEmployeeById(id);
  //   user.role = UserRole.ADMIN;
  //   await user.save();
  //   return user;
  // }
  // Update user to Employee
  // async updateToEmployee(id: number): Promise<any> {
  //   const user = await this.getUserById(id);
  //   user.role = UserRole.EMPLOYEE;
  //   await user.save();
  //   return user;
  // }
  // Update user to Seller
  // async updateToSeller(id: number): Promise<any> {
  //   const user = await this.getUserById(id);
  //   user.role = UserRole.SELLER;
  //   await user.save();
  //   return user;
  // }
  // Update user to Customer
  // async updateToCustomer(id: number): Promise<any> {
  //   const user = await this.getUserById(id);
  //   user.role = UserRole.CUSTOMER;
  //   await user.save();
  //   return user;
  // }
  // update user role manually
  // async updateUserRole(id: number, role: UserRole): Promise<any> {
  //   const user = await this.getUserBy(id);
  //   user.role = role;
  //   await user.save();
  //   return user;
  // }
}
