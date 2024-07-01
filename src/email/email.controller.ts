/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: any) {
    const {
      name,
      email,
      phoneNumber,
      city,
      bathrooms,
      bedrooms,
      property,
      service,
      pets,
      message,
    } = body;
    try {
      await this.emailService.sendEmail(
        name,
        email,
        phoneNumber,
        city,
        bathrooms, 
        bedrooms,
        property,
        service,
        pets,
        message,
      );
      return { mensagem: 'Email successfully sent' };
    } catch (error) {
      return { mensagem: 'Error sending email' };
    }
  }

  @Get('health-check')
  healthcheck() {
    const date = new Date()
    console.log({ messagem: 'Server is up and running', hour: date.toLocaleString()})
    return { messagem: 'Server is up and running', hour: date.toLocaleString()};
  }
}
