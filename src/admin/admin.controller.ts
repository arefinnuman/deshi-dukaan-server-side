import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveUploadedFile } from './../helper/saveUploadedFile';

import { AdminService } from './admin.service';
import { AdminChangePassDto } from './dto/adminChangePassDto';
import { AdminSignInDto } from './dto/adminSignInDto';
import { AdminUpdateDto } from './dto/adminUpdateDto';
import { CreateAdminDto } from './dto/createAdminDto';
import { CreatePaymentDto } from './dto/createPayment.Dto';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Admin Can Sign-up and Sign in
  // Sign-up can be dome using createAdmin method
  @Post('sign-up')
  async signUp(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    return await this.adminService.createAdmin(createAdminDto);
  }
  // Sign-in
  @Post('sign-in')
  async signIn(@Session() session, @Body(ValidationPipe) adminSignInDto: AdminSignInDto) {
    const found = await this.adminService.signIn(adminSignInDto);
    if (found) {
      session.A_Email = adminSignInDto.A_Email;
      console.log(session.A_Email);
      return { message: 'You are logged in' };
    } else {
      return { message: 'Invalid Credentials' };
    }
  }
  // Sign-out
  @Get('/sign-out')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'You are logged out' };
    } else {
      throw new UnauthorizedException('Invalid Actions');
    }
  }
  // Verify Route
  @Get('/verify-email/')
  verifyEmail(@Query('uid', ParseUUIDPipe) uuid) {
    return this.adminService.verifyEmail(uuid);
  }

  // ------------------ Admin------------------//
  // Create Admin
  @Post('/create-admin')
  async createAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    return await this.adminService.createAdmin(createAdminDto);
  }
  //   Get Admin by Id
  @Get('/admin/:id')
  async getAdminById(@Param('id', ParseUUIDPipe) uuid) {
    return await this.adminService.getAdminById(uuid);
  }
  //   Get All Admins
  @Get('/admins')
  async getAllAdmins() {
    return await this.adminService.getAllAdmins();
  }
  // Edit Admin Profile
  @Put('/edit-profile/:id')
  // @UseGuards(SessionGuard)
  @UseInterceptors(FileInterceptor('A_Photo', saveUploadedFile))
  updateProfile(
    // @Session() session,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) adminUpdateDto: AdminUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(session.A_Email);
    if (!file) {
      adminUpdateDto.A_Photo = null;
      return this.adminService.updateProfile(id, adminUpdateDto);
    } else {
      console.log(file);
      adminUpdateDto.A_Photo = file.filename;
      return this.adminService.updateProfile(id, adminUpdateDto);
    }
  }
  //   Change Password
  @Patch('/change-password/:id')
  changePassword(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) adminChangePassDto: AdminChangePassDto) {
    return this.adminService.changePassword(id, adminChangePassDto);
  }
  //   Delete Admin
  @Delete('/delete-admin/:id')
  async deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteAdmin(id);
  }

  // ------------------ Admin have some seller functionality------------------//

  //   Get All Sellers
  @Get('/sellers')
  async getAllSellers() {
    return await this.adminService.getAllSellers();
  }
  //   Get Seller by id
  @Get('/seller/:id')
  async getSellerById(@Param('id', ParseUUIDPipe) uuid) {
    return await this.adminService.getSellerById(uuid);
  }
  //   Admin can delete seller
  @Delete('/delete-seller/:id')
  async deleteSeller(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteSeller(id);
  }

  // ------------------ Admin have some Customer functionality------------------//
  //   Get All Customers
  @Get('/customers')
  async getAllCustomers() {
    return await this.adminService.getAllCustomers();
  }
  //   Get Customer by id
  @Get('/customer/:id')
  async getCustomerById(@Param('id', ParseUUIDPipe) uuid) {
    return await this.adminService.getCustomerById(uuid);
  }
  //   Admin can delete customer
  @Delete('/delete-customer/:id')
  async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteCustomer(id);
  }

  // ------------------ Admin have some Payment functionality------------------//
  //   Admin can create payment type
  @Post('/create-payment')
  createPayment(@Body(ValidationPipe) createPaymentDto: CreatePaymentDto) {
    return this.adminService.createPaymentType(createPaymentDto);
  }
  //   Admin can get all payment types
  @Get('/payments-types')
  async getAllPaymentsTypes() {
    return await this.adminService.getAllPaymentTypes();
  }
  //   Admin can delete payment type
  @Delete('/delete-payment/:id')
  async deletePayment(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deletePaymentType(id);
  }

  // ------------------ Admin have some order functionality------------------//
  //   View All orders
  @Get('/orders')
  async getAllOrders() {
    return await this.adminService.getAllOrders();
  }
  //  View order by id
  @Get('/order/:id')
  async getOrderById(@Param('id', ParseUUIDPipe) uuid) {
    return await this.adminService.getOrderById(uuid);
  }
  //  View order by customer id
  // @Get('/order/customer/:id')
  // async getOrderByCustomerId(@Param('id', ParseUUIDPipe) uuid) {
  //   return await this.adminService.getOrderByCustomerId(uuid);
  // }

  // ------------------ Admin have some product functionality------------------//
  //   View All Products
  @Get('/products')
  async getAllProducts() {
    return await this.adminService.getAllProducts();
  }

  // ------------------ Admin have some review functionality------------------//
  // View All Reviews
  @Get('/reviews')
  async getAllReviews() {
    return await this.adminService.getAllReviews();
  }
}
