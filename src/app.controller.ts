import { Controller, Get, Post, Req, Res, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

//in tuto error curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
//it should be curl -X POST http://localhost:3000/auth/login -d "{\"username\": \"john\", \"password\": \"changeme\"}" -H "Content-Type: application/json"
  @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      return req.user;
    }

  @Get()
  getHello(): string {
    this.appService.axiosPOST('dot');
    this.appService.axiosGET('1');
    this.appService.axiosPATCH('2');
    this.appService.axiosPUT('3');
    this.appService.axiosDELETE('4');

    return this.appService.getHello();
  }

  @Get('test')
  getTest(@Req() req, @Res() res): string {
    const name=req.query['name'];

    return res.send('<h1>Hello ${name}</h1>');
  }
}
