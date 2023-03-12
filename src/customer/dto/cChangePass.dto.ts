import { IsNotEmpty, Length } from 'class-validator';

export class CustomerChangePassDto {
  @IsNotEmpty()
  C_CurrentPassword: string;

  @IsNotEmpty()
  @Length(8, 30)
  C_NewPassword: string;
}
