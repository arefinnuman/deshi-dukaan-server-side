import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

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
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
