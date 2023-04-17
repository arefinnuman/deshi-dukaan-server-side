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

// @Column({ nullable: true })
//   S_Photo: string;

//   @Column()
//   S_Name: string;

//   @Column()
//   S_Email: string;

//   @Column()
//   S_Phone: string;

//   @Column({ nullable: true })
//   S_Address: string;

//   @Column()
//   S_Dob: Date;

//   @Column()
//   S_Gender: string;

//   @Column()
//   S_Password: string;

//   @Column()
//   S_CompanyName: string;

//   @Column({ nullable: true })
//   S_CompanyLogo: string;

//   @Column()
//   S_Status: string;

//   @Column({ nullable: true })
//   Role: string;

//   @Column({ nullable: true })
//   S_Verified: boolean;

//   @Column()
//   S_CreatedAt: Date;

//   @Column()
//   S_ModifiedAt: Date;
