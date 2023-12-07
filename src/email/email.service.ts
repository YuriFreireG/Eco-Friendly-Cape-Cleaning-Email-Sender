import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

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
      from: email,
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
