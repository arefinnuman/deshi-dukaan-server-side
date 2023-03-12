import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CustomerUpdateDto {
  @IsOptional()
  C_Photo: string;

  @IsNotEmpty()
  C_Name: string;

  @IsNotEmpty()
  @IsEmail()
  C_Email: string;

  @IsNotEmpty()
  C_Phone: string;

  C_Address: string;

  @IsNotEmpty()
  C_Dob: Date;

  @IsNotEmpty()
  C_Gender: string;

  C_ModifiedAt: Date;
}
