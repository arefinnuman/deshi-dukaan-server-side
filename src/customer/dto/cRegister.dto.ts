import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CustomerRegisterDto {
  @IsNotEmpty()
  C_Name: string;

  @IsNotEmpty()
  @IsEmail()
  C_Email: string;

  @IsNotEmpty()
  C_Phone: string;

  @IsNotEmpty()
  C_Dob: Date;

  @IsNotEmpty()
  C_Gender: string;

  @IsNotEmpty()
  @Length(8, 30)
  C_Password: string;

  C_CreatedAt: Date;

  C_ModifiedAt: Date;
}
