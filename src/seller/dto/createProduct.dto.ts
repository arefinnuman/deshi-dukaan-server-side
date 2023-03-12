import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  P_Name: string;

  @IsNotEmpty()
  P_Desc: string;

  @IsNotEmpty()
  @IsInt()
  P_Qty: number;

  @IsNotEmpty()
  P_Waranty: string;

  @IsNotEmpty()
  @IsNumber()
  P_Price: number;

  @IsNotEmpty()
  category: number; // FK_CategoryId
}
