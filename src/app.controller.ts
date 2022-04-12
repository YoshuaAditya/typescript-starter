import { Controller, Get, Post, Req, Res, Request, UseGuards, Param, Render, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { RolesGuard } from './enums/roles.guard'
import { AuthService } from './auth/auth.service';
import { Users } from './users/user.entity';
import { Role } from './enums/role.enum';
import { Roles } from './enums/roles.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('profile')
    @Roles(Role.Admin)
    getProfile(@Request() req) {
      console.log(req);
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

    @Get('login')
    @Render('login')
    root() {
      return { title: 'Hello world!' };
    }

    @Get('register')
    @Render('register')
    registerUser(@Res() res){
      return { title:"Register" };
    }

    @Post('register')
    async saveUserData(@Request() req){
      await this.usersService.register(req.body);
    }

    //reminder that route orders are important! and use `` not '' for this test
    @Get('test')
    getTest(@Req() req, @Res() res): string {
      const name=req.query["name"];
      return res.send(`<h1>Hello ${name}</h1>`);
    }

    @Get(':username')
    findOne(@Param('username') id: string): Promise<Users> {
      return this.usersService.findOne(id);
    }

  }
