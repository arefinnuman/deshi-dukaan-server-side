import { ParseIntPipe } from '@nestjs/common';
import { ProductCategory } from './enum/product-category.enum';
import { CategoryValidationPipe } from './pipes/category-validation.pipes';
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entity/product.entity';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}

  //   Create Product
  @Post('/create-product')
  @UsePipes(ValidationPipe)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @Body('category', CategoryValidationPipe) category: ProductCategory,
  ) {
    return this.sellerService.createProduct(createProductDto, category);
  }

  //  Get ALl Products
  @Get('products')
  getProduct(): Promise<ProductEntity[]> {
    return this.sellerService.getAllProduct();
  }
  // Get Products by ID
  @Get('product/:id')
  getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return this.sellerService.getProductById(id);
  }

  // Edit Product
  @Put('/edit-product/:id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body('productName') productName: string,
    @Body('price') price: number,
    @Body('description') description: string,
    @Body('image') image: string,
    @Body('quantity') quantity: number,
    @Body('category', CategoryValidationPipe) category: ProductCategory,
  ): Promise<any> {
    return this.sellerService.updateProduct(
      id,
      productName,
      price,
      description,
      image,
      quantity,
      category,
    );
  }

  // Search Product

  //   Delete Product
  @Delete('/delete-product/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return this.sellerService.deleteProduct(id);
  }
}
