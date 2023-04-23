import { IsNotEmpty } from 'class-validator';
export class CreateSellerDto {
  @IsNotEmpty()
  S_Name: string;

  @IsNotEmpty()
  S_Email: string;

  @IsNotEmpty()
  S_Phone: string;

  @IsNotEmpty()
  S_Dob: Date;

  @IsNotEmpty()
  S_Gender: string;

  @IsNotEmpty()
  S_CompanyName: string;

  @IsNotEmpty()
  S_Status: boolean;

  @IsNotEmpty()
  S_Password: string;

  S_CreatedAt: Date;

  S_ModifiedAt: Date;
}
