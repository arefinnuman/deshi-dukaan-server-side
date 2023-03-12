import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { DbModule } from './db/db.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4444,
      username: 'postgres',
      password: 'postgress',
      database: 'deshi_dukaan_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DbModule,
    AdminModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
