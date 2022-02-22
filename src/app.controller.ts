import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.appService.axiosPOST('dot');
    this.appService.axiosGET('1');
    this.appService.axiosPATCH('2');
    this.appService.axiosPUT('3');
    this.appService.axiosDELETE('4');

    return this.appService.getHello();
  }
}
