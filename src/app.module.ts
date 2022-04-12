import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/post.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';
import { Users } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';

//yet another weird error for env
//what works is that editing nest-cli.json, then adding common envs helper folder files, then access from here
//use ConfigService.get to access envs
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'user',
      database: 'test',
      entities: [Posts, Users],
      synchronize: true,
    }),PostsModule, AuthModule, UsersModule, GoogleOauthModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
