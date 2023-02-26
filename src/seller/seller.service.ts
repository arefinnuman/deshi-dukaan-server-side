import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entity/product.entity';
import { SellerEntity } from './entity/seller.entity';
import { ProductCategory } from './enum/product-category.enum';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>,
  ) {}

  //   Create a Product Post
  async createProduct(
    createProductDto: CreateProductDto,
    category: ProductCategory,
  ) {
    const { productName, price, description, image, quantity } =
      createProductDto;
    const product = new ProductEntity();
    product.productName = productName;
    product.price = price;
    product.description = description;
    product.image = image;
    product.quantity = quantity;
    product.category = category;
    await product.save();

    return product;
  }
  //   View All Product
  getAllProduct(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }
  //   Find a Product by id
  async getProductById(id: number): Promise<ProductEntity> {
    const found = await this.productRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Product with Id '${id}' not found`);
    }

    return found;
  }

  // Edit Product
  async updateProduct(
    id: number,
    productName: string,
    price: number,
    description: string,
    image: string,
    quantity: number,
    category: ProductCategory,
  ): Promise<any> {
    const product = await this.getProductById(id);

    product.productName = productName;
    product.price = price;
    product.description = description;
    product.image = image;
    product.quantity = quantity;
    product.category = category;

    await product.save();
    return product;
  }

  //   Delete a product from Database
  async deleteProduct(id: number): Promise<any> {
    const product = await this.getProductById(id);
    await product.remove();
    return product;
  }
}
