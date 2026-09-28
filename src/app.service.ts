import { Injectable } from '@nestjs/common';

@Injectable() // Dependecy Injection DI
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
