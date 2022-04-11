import { Controller, Get, Post, Req, Res, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) {}

//in tuto error curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
//it should be curl -X POST http://localhost:3000/auth/login -d "{\"username\": \"john\", \"password\": \"changeme\"}" -H "Content-Type: application/json"
//goto file local-authguard, then LocalStrategy, if userinfo is correct returns const result(which has jsondata user, which password is stripped)  from authService
//the result is a jwt token which will be used to protect endpoints by requesting this jwt token
  @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
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
