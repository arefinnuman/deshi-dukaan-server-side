import { IsNotEmpty } from 'class-validator';
export class CreateAdminDto {
  @IsNotEmpty()
  A_Name: string;

  @IsNotEmpty()
  A_Email: string;

  @IsNotEmpty()
  A_Phone: string;

  @IsNotEmpty()
  A_Dob: Date;

  @IsNotEmpty()
  A_Gender: string;

  @IsNotEmpty()
  A_Password: string;

  A_CreatedAt: Date;

  A_ModifiedAt: Date;
}
