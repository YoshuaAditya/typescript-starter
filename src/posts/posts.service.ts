import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import {getConnection} from "typeorm";
const axios = require('axios').default;

@Injectable()
export class PostsServices {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}
  create(createPostDto: CreatePostDto): Promise<Posts> {
    const user = new Posts();
    user.userId = createPostDto.userId;
    user.title = createPostDto.title;
    user.body = createPostDto.body;

    return this.postRepository.save(user);
  }
  insert(): void {
    let postRepository:Repository<Posts>;
    postRepository=this.postRepository;
    axios.get("https://jsonplaceholder.typicode.com/posts/1")
    .then(function (response) {
      postRepository.createQueryBuilder('posts')
      .insert()
      .into('posts')
      .values([
        { userId:response.data.userId, title: response.data.title, body: response.data.body }
      ])
      .execute();
      console.log(response.data.title);
    })
    .catch(function (error) {
      console.log(error);
    });


  }
  findAll(): Promise<Posts[]> {
    return this.postRepository.find();
  }

  findOne(id: string): Promise<Posts> {
    return this.postRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete(id);
  }
}
