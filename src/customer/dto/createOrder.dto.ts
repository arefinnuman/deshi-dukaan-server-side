import { IsNotEmpty } from 'class-validator';
import { OrderDetail } from 'src/db/entity/orderDetail.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  OrderPhone: string;

  @IsNotEmpty()
  OrderAddress: string;

  orderDetails: OrderDetail[];

  payment: number;
}
