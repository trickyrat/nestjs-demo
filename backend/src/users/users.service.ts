import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>) { }

  async init() {
    this.roleRepository.save({ name: "admin" });
    this.roleRepository.save({ name: "moderator" });
    this.roleRepository.save({ name: "user" });

    const salt = await genSalt(8);
    await this.userRepository.save({
      username: "admin",
      password: await hash("1q2w3E!", salt),
      salt: salt,
      nickname: "admin",
      roles: [
        { id: 1, name: "admin" }
      ]
    });
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: {
        username: username
      }
    });
  }
}
