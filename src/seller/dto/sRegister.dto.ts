import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SellerRegisterDto {
  @IsNotEmpty()
  S_Name: string;

  @IsNotEmpty()
  @IsEmail()
  S_Email: string;

  @IsNotEmpty()
  S_Phone: string;

  @IsNotEmpty()
  S_Dob: Date;

  @IsNotEmpty()
  S_Gender: string;

  @IsNotEmpty()
  @Length(8, 30)
  S_Password: string;

  @IsNotEmpty()
  S_CompanyName: string;

  @IsNotEmpty()
  S_Status: string;
}
