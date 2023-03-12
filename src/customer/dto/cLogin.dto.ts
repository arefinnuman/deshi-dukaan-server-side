import { IsNotEmpty } from 'class-validator';

export class CustomerLoginDto {
  @IsNotEmpty()
  C_Email: string;

  @IsNotEmpty()
  C_Password: string;
}
