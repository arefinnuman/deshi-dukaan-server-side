import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    EmployeeModule,
    SellerModule,
    CustomerModule,
  ],
})
export class AppModule {}
