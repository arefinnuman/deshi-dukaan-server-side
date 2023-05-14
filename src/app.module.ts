import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { DbModule } from './db/db.module';
import { SellerModule } from './seller/seller.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'containers-us-west-42.railway.app',
      port: 5464,
      username: 'postgres',
      password: '1WL9E3WWL4OXyjoOvjSD',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DbModule,
    AdminModule,
    CustomerModule,
    SellerModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
