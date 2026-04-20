import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAll() {
    const users = await this.usersRepository.find(); // es un select * from users sin where
    return users;
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      relations: ['profile'],
     });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException('You are not allowed to access this user');
    }
    return user;
  }

  async getProfileById(id: number) {
    const user = await this.findOne(id);
    return user.profile;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const updatedUser = this.usersRepository.merge(user, changes);
      const savedUser = await this.usersRepository.save(updatedUser);
      return savedUser;
    } catch (error) {
      throw new BadRequestException('Error updating user');
    }
  }

  async delete(id: number) {
    try {
      await this.usersRepository.delete(id);
      return {
        message: `User with id ${id} deleted`,
      };
    } catch (error) {
      throw new BadRequestException('Error deleting user');
    }
  }
}
