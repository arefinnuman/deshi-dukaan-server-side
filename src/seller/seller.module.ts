import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/product.entity';
import { Seller } from './entity/seller.entity';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Seller])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
