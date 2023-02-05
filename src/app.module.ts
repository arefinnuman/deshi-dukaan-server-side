import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { SellerModule } from './seller/seller.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    EmployeeModule,
    SellerModule,
    CustomerModule,
  ],
  providers: [TaskService],
})
export class AppModule {}
