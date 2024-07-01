import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private httpService: HttpService,
  ) {}

  @Cron('*/14 * * * *')
  async handleCron() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3000/email/health-check'),
      );
      console.log('Server is up', response.data);
    } catch (error) {
      console.error('Server is down', error.message);
    }
  }

  async sendEmail(
    name: string,
    email: string,
    phoneNumber: string,
    city: string,
    bathrooms: string,
    bedrooms: string,
    property: string,
    service: string,
    pets: string,
    message: string,
  ) {
    await this.mailerService.sendMail({
      to: process.env.EMAIL_DESTINO,
      from: '"Eco Friendly Cape Cleaning" <ecofriendlycapecleaning@gmail.com>',
      subject: `Costumer: ${name}, Service: ${service}`,
      html: `
      <p>Costumer First Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone number: ${phoneNumber}</p>
      <p>City: ${city}</p>
      <p>Number of bathrooms: ${bathrooms}</p>
      <p>Number of bedrooms: ${bedrooms}</p>
      <p>Property size in square feet: ${property}</p>
      <p>Service: ${service}</p>
      <p>Any Pets: ${pets}</p>
      <p>Message: ${message}</p>`,
    });
  }
}
