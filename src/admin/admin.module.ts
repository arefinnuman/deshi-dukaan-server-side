import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admins } from './entity/admin.entity';
import { Employees } from './entity/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employees, Admins])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
