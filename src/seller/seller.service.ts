import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/db/entity/product.entity';
import { Seller } from 'src/db/entity/seller.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private sellerRepo: Repository<Seller>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async registerAccount(sellerRegisterDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      sellerRegisterDto.S_Password,
      salt,
    );
    sellerRegisterDto.S_Password = hashedPassword;
    sellerRegisterDto.S_CreatedAt = new Date();
    sellerRegisterDto.S_ModifiedAt = new Date();
    return await this.sellerRepo.save(sellerRegisterDto);
  }

  async signIn(sellerSignInDto) {
    const { S_Email, S_Password } = sellerSignInDto;
    const user = await this.sellerRepo.findOneBy({ S_Email });
    if (user && (await bcrypt.compare(S_Password, user.S_Password))) {
      return user;
    } else {
      throw new UnauthorizedException('Enter Valid Credentials');
    }
  }

  createProduct(id, createProductDto) {
    createProductDto.P_CreatedAt = new Date();
    createProductDto.P_ModifiedAt = new Date();
    createProductDto.seller = id;
    return this.productRepo.save(createProductDto);
  }

  // Delete Account
  async deleteAccount(id) {
    return await this.sellerRepo.delete(id);
  }

  // Seller can delete her/his own product
  async deleteProduct(id) {
    return await this.productRepo.delete(id);
  }

  // Seller can update her/his own product

  // Seller can view her/his own product
  async viewProduct(id) {
    return await this.productRepo.findOne(id);
  }

  // Seller can view her/his own products
  async viewProducts(id) {
    return await this.productRepo.find({ where: { seller: id } });
  }

  // Seller can view her/his own profile
  async viewProfile(id) {
    return await this.sellerRepo.findOne(id);
  }

  // Seller can update her/his own profile
  async updateProfile(id, updateSellerDto) {
    updateSellerDto.S_ModifiedAt = new Date();
    return await this.sellerRepo.update(id, updateSellerDto);
  }
}
