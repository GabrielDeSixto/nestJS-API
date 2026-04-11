import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from './entities/user.entiti';
import { CreateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll() {
    return this.usersRepository.find();
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return position;
  }

  getUserById(id: string) {
    const position = this.findOne(id);
    const user = this.users[position];
    if (user.id === '1') {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, user: CreateUserDto) {
    const position = this.findOne(id);
    const currentData = this.users[position];
    const updatedUser = {
      ...currentData,
      ...user,
      id,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    const position = this.findOne(id);
    this.users.splice(position, 1);
    return {
      message: `User with id ${id} deleted`,
    };
  }
}
