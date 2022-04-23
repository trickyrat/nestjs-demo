import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { genSalt, hash } from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserContants } from './constants';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { UserDto } from './dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { getNowString } from 'src/utils/time';


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

  async insert(input: SignUpUserDto): Promise<UserDto> {
    let roles: Role[] = await this.roleRepository.find({
      where: {
        name: input.roles
      }
    });
    let user = new User();
    user.username = input.username;
    const salt = await genSalt(UserContants.saltRound);
    user.password = await hash(input.password, salt);
    user.salt = salt;
    user.nickname = input.nickname;
    user.roles = roles;
    user.createDate = getNowString();
    user = await this.userRepository.save(user);
    return plainToClass(UserDto, user.username);
  }

  async checkRolesExisted(roles: string[]): Promise<boolean> {
    let res = await this.roleRepository.find({
      where: {
        name: roles
      }
    });
    return res.length <= 0 ? false : true;
  }

  async checkDuplicateUsername(username: string): Promise<boolean> {
    let user = this.userRepository.findOne(username);
    if (!user) {
      return false;
    }
    return true;
  }
}
