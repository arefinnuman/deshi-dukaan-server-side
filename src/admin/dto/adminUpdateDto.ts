import { IsNotEmpty } from 'class-validator';
export class AdminUpdateDto {
  A_Photo: string;

  @IsNotEmpty()
  A_Name: string;

  @IsNotEmpty()
  A_Email: string;

  @IsNotEmpty()
  A_Phone: string;

  A_Address: string;

  @IsNotEmpty()
  A_Dob: Date;

  @IsNotEmpty()
  A_Gender: string;

  A_ModifiedAt: Date;
}
