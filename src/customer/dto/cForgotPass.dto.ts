import { IsEmail } from 'class-validator';

export class CustomerForgotPassDto {
  @IsEmail()
  C_Email: string;
}
