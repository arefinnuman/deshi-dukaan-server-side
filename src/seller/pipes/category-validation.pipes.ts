import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProductCategory } from '../enum/product-category.enum';
export class CategoryValidationPipe implements PipeTransform {
  readonly allowedCategories = [
    ProductCategory.ELECTRONICS,
    ProductCategory.FASHION,
    ProductCategory.HOME,
    ProductCategory.GROCERY,
    ProductCategory.SPORTS,
    ProductCategory.BOOKS,
    ProductCategory.OTHER,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isCategoryValid(value)) {
      throw new BadRequestException(
        `'${value}' is an invalid category, Please give a valid category`,
      );
    }
    return value;
  }

  private isCategoryValid(category: any) {
    const index = this.allowedCategories.indexOf(category);
    return index !== -1;
  }
}
