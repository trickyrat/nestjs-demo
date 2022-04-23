import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserContants } from './constants';
import { SignUpUserDto } from './dtos/signup-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>) { }

  async seedData() {
    let roleCount = await this.roleRepository.count();
    if (roleCount < 1) {
      this.roleRepository.save({ name: "admin" });
      this.roleRepository.save({ name: "moderator" });
      this.roleRepository.save({ name: "user" });
    }

    let userCount = await this.userRepository.count();
    if (userCount < 1) {
      const salt = await genSalt(UserContants.saltRound);
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
  }

  async findOne(input: LoginUserDto): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username: input.username
      },
      relations: ["roles"],
    });
  }

  async create(input: SignUpUserDto): Promise<User> {
    const salt = await genSalt(UserContants.saltRound);
    let roles: Role[] = [];
    if (input.roles.length > 0) {
      roles = await this.roleRepository.find({
        where: {
          name: input.roles
        }
      })
    }
    let user = new User();
    user.username = input.username;
    user.password = await hash(input.password, salt);
    user.salt = salt;
    user.nickname = input.nickname;
    user.roles = roles;

    return await this.userRepository.save(user);
  }

  // async checkRolesExisted(roles: Role[]): Promise<boolean> {
  //   this.roleRepository.find({
  //     where: {

  //     }
  //   })
  // }

  async checkDuplicateUsername(username: string): Promise<boolean> {
    let user = this.userRepository.findOne(username);
    if (user) {
      return false;
    }
    return true;
  }
}
