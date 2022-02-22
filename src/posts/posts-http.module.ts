
import { Module } from '@nestjs/common';
import { PostsModule } from './posts.module';
import { PostsServices } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [PostsModule],
  providers: [PostsServices],
  controllers: [PostsController]
})
export class PostHttpModule {}
