import { IsNotEmpty } from 'class-validator';
export class CreateEmployeeDto {
  @IsNotEmpty()
  E_Name: string;

  @IsNotEmpty()
  E_Email: string;

  @IsNotEmpty()
  E_Phone: string;

  @IsNotEmpty()
  E_Address: string;

  @IsNotEmpty()
  E_Dob: Date;

  @IsNotEmpty()
  E_Gender: string;

  @IsNotEmpty()
  E_Password: string;

  E_CreatedAt: Date;

  E_ModifiedAt: Date;
}
