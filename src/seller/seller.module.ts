import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { SellerEntity } from './entity/seller.entity';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, SellerEntity])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
