import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { Category } from './entity/category.entity';
import { Customer } from './entity/customer.entity';
import { CustomerPayment } from './entity/customerPayment.entity';
import { Order } from './entity/order.entity';
import { OrderDetail } from './entity/orderDetail.entity';
import { Payment } from './entity/payment.entity';
import { Product } from './entity/product.entity';
import { ProductPhoto } from './entity/productPhoto.entity';
import { Review } from './entity/review.entity';
import { Seller } from './entity/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      Seller,
      Customer,
      Product,
      ProductPhoto,
      Category,
      Order,
      OrderDetail,
      Payment,
      CustomerPayment,
      Review,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
