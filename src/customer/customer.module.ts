import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    DbModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'desidukaan.official@gmail.com',
          pass: 'cetwodmgagbcxmwp',
        },
      },
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
