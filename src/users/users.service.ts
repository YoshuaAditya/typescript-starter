import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';

//Kinda confusing, but always check this module and app module after adding dtos

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<Users>{
      const encryptedPassword= await bcrypt.hash(createUserDto.password, 10);
      const user = new Users();
      user.username = createUserDto.username;
      user.password = encryptedPassword;

      return this.userRepository.save(user);
    }

    findAll(): Promise<Users[]> {
      return this.userRepository.find();
    }

    findOne(username: any): Promise<Users> {
      // return this.userRepository.findOne('1');
      return this.userRepository.createQueryBuilder('users')
      .select()
      .where("username = :name", { name: username })
      .getOne();
      // return this.userRepository.findOne({ username: username });
      // return this.userRepository.query('SELECT * FROM users WHERE username = %s', username);
    }

    async remove(id: string): Promise<void> {
      await this.userRepository.delete(id);
    }

}
