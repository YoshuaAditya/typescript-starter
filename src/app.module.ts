import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/post.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './enums/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'user',
      database: 'test',
      entities: [Posts, Users],
      synchronize: true,
    }),PostsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
