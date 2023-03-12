import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { SellerSignInDto } from './dto/sellerSignInDto';
import { SellerRegisterDto } from './dto/sRegister.dto';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}

  // Seller can register
  @Post('/register')
  registerAccount(@Body(ValidationPipe) sellerRegisterDto: SellerRegisterDto) {
    return this.sellerService.registerAccount(sellerRegisterDto);
  }

  //  Seller can sign in
  @Post('sign-in')
  async signIn(
    @Session() session,
    @Body(ValidationPipe) sellerSignInDto: SellerSignInDto,
  ) {
    const found = await this.sellerService.signIn(sellerSignInDto);
    if (found) {
      session.S_Email = sellerSignInDto.S_Email;
      console.log(session.S_Email);
      return { message: 'You are logged in' };
    } else {
      return { message: 'Invalid Credentials' };
    }
  }

  // seller can sign out
  @Get('/sign-out')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'You are logged out' };
    } else {
      throw new UnauthorizedException('Invalid Actions');
    }
  }

  // Seller can create product
  @Post('/create-product/:id')
  createProduct(
    @Param('id') id: number,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ) {
    return this.sellerService.createProduct(id, createProductDto);
  }

  // Delete Product
  @Get('/delete-product/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.sellerService.deleteProduct(id);
  }

  // Delete Account
  @Get('/delete-account/:id')
  async deleteAccount(@Param('id') id: number) {
    return await this.sellerService.deleteAccount(id);
  }

  // Seller can view her/his products
  @Get('/view-products/:id')
  async viewProducts(@Param('id') id: number) {
    return await this.sellerService.viewProducts(id);
  }

  // Seller can view her/his product
  @Get('/view-product/:id')
  async viewProduct(@Param('id') id: number) {
    return await this.sellerService.viewProduct(id);
  }

  // Seller can update her/his profile
  @Post('/update-profile/:id')
  async updateProfile(
    @Param('id') id: number,
    @Body(ValidationPipe) sellerRegisterDto: SellerRegisterDto,
  ) {
    return await this.sellerService.updateProfile(id, sellerRegisterDto);
  }
}
