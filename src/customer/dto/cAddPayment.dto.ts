import { IsNotEmpty } from 'class-validator';

export class CustomerAddPaymentDto {
  @IsNotEmpty()
  CP_AccountNo: string;

  @IsNotEmpty()
  payment: number;
}
