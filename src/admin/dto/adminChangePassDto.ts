import { IsNotEmpty, Length } from 'class-validator';

export class AdminChangePassDto {
  @IsNotEmpty()
  A_CurrentPassword: string;

  @IsNotEmpty()
  @Length(8, 30)
  A_NewPassword: string;
}
