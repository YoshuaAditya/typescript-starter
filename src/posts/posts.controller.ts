import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsServices } from './posts.service';
import { Posts } from './post.entity';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsServices) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.create(createPostDto);
  }

  @Get('api')
  insert():void {
    return this.postsService.insert();
  }

  @Get('api_v2')
  async post() {
    return this.postsService.post();
  }

  @Get()
  async findAll() {
    //async untuk console log promise
    const x = await this.postsService.findAll();
    console.log(x.at(4).body);
    return x;
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
