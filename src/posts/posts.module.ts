import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsServices } from './posts.service';
import { PostsController } from './posts.controller';
import { Posts } from './post.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  exports: [TypeOrmModule],
  controllers: [PostsController],
  providers: [PostsServices],
})
export class PostsModule {}
