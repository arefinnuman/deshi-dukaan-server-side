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
import { saveUploadedFile } from 'src/helper/saveUploadedFile';
import { CustomerService } from './customer.service';
import { CustomerAddPaymentDto } from './dto/cAddPayment.dto';
import { CustomerChangePassDto } from './dto/cChangePass.dto';
import { CustomerForgotPassDto } from './dto/cForgotPass.dto';
import { CustomerLoginDto } from './dto/cLogin.dto';
import { CustomerUpdateDto } from './dto/cProfileUpdate.dto';
import { CreateOrderDto } from './dto/createOrder.dto';
import { CreateReviewDto } from './dto/createReview.dto';
import { CustomerRegisterDto } from './dto/cRegister.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('/register')
  registerAccount(
    @Body(ValidationPipe) customerRegisterDto: CustomerRegisterDto,
  ) {
    return this.customerService.registerAccount(customerRegisterDto);
  }
  @Get('/verify-email/')
  verifyEmail(@Query('uid', ParseUUIDPipe) uuid) {
    return this.customerService.verifyEmail(uuid);
  }
  @Get('/profile/:id')
  viewProfile(@Param('id', ParseUUIDPipe) uuid) {
    return this.customerService.viewProfile(uuid);
  }
  @Put('/profile/:id')
  @UseInterceptors(FileInterceptor('C_Photo', saveUploadedFile))
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) customerUpdateDto: CustomerUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      customerUpdateDto.C_Photo = null;
      return this.customerService.updateProfile(id, customerUpdateDto);
    } else {
      console.log(file);
      customerUpdateDto.C_Photo = file.filename;
      return this.customerService.updateProfile(id, customerUpdateDto);
    }
  }
  @Delete('/delete/:id')
  deleteAccount(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteAccount(id);
  }
  @Patch('/change-password/:id')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) customerChangePassDto: CustomerChangePassDto,
  ) {
    return this.customerService.changePassword(id, customerChangePassDto);
  }

  @Post('/forgot-password')
  forgotPassword(
    @Body(ValidationPipe) customerForgotPassDto: CustomerForgotPassDto,
  ) {
    return this.customerService.forgotPassword(customerForgotPassDto);
  }
  // @Post('/verify-otp')
  // async verifyOtp(@Body(ValidationPipe) customerForgotPassDto: CustomerForgotPassDto) {
  //   return 'OTP Verified';
  // }
  @Get('/product')
  viewAllProduct() {
    return this.customerService.viewAllProduct();
  }
  @Get('/product/:id')
  viewProductDetail(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.viewProductDetail(id);
  }
  @Get('/s')
  searchProduct(@Query() query) {
    return this.customerService.searchProduct(query);
  }
  @Get('/add-to-cart/')
  async addToCart(@Session() session, @Query() query) {
    const isValid = await this.customerService.addToCart(query);
    if (isValid) {
      session.pid = query.id;
      console.log(session.pid);
    } else {
      return { message: 'Invalid Product' };
    }
  }
  @Get('/cart')
  viewCart(@Session() session) {
    console.log(session);
    return this.customerService.viewCart(session);
  }

  @Post('/create-order/:id')
  createOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
  ) {
    return this.customerService.createOrder(id, createOrderDto);
  }
  @Get('/order/:id')
  viewAllOrder(@Param('id') id: number) {
    return this.customerService.viewAllOrder(id);
  }
  @Get('/order/')
  viewOrderDetail(@Query() orderCode: string) {
    return this.customerService.viewOrderDetail(orderCode);
  }
  @Get('/payment')
  viewPayment() {
    return this.customerService.viewPayment();
  }

  @Post('/:id/review/')
  postReview(
    @Param('id', ParseIntPipe) id: number,
    @Query() productId: number,
    @Body(ValidationPipe) createReviewDto: CreateReviewDto,
  ) {
    return this.customerService.postReview(id, productId, createReviewDto);
  }

  // @Get('/myReviews/:id')
  // viewMyReviews(@Param('id', ParseIntPipe) id: number) {
  //   return this.customerService.viewMyReviews(id);
  // }

  @Post('/add-payment/:id')
  addPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) customerAddPaymentDto: CustomerAddPaymentDto,
  ) {
    return this.customerService.addPayment(id, customerAddPaymentDto);
  }

  @Get('/my-payment/:id')
  viewMyPayment(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.viewMyPayment(id);
  }

  @Post('/login')
  async login(
    @Session() session,
    @Body(ValidationPipe) customerLoginDto: CustomerLoginDto,
  ) {
    const isValid = await this.customerService.login(customerLoginDto);
    if (isValid) {
      session.email = customerLoginDto.C_Email;
      return { message: 'Login Success' };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
  @Get('/logout')
  logout(@Session() session) {
    if (session.destroy()) {
      return { message: 'You are logged out' };
    } else {
      throw new UnauthorizedException('Invalid actions');
    }
  }
}
