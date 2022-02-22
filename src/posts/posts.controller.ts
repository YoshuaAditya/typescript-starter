import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsServices } from './posts.service';
import { Posts } from './post.entity';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsServices) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(createPostDto);
  }

  @Get('api')
  insert():void {
    return this.postsService.insert();
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Posts> {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }

}
