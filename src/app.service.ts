import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRegister(): string {
    return 'Hello World!';
  }
}
