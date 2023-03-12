import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  PaymentType: string;
}
