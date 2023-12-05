import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        ignoreTLS: true,
      },
    }),
    EmailModule,
  ],
  controllers: [EmailController],
  providers: [],
})
export class AppModule {}
