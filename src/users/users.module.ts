import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService],
})
export class UsersModule {}
