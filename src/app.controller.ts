import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//parse HTTP, serves as entry point handling incoming http requests and incoming responses

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //decorators
  getHello(): string {
    return this.appService.getHello();
  }
}

