import { IsNotEmpty } from 'class-validator';
import { ProductCategory } from './../enum/product-category.enum';
export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  category: ProductCategory;
}
