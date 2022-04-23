import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserContants } from './constants';

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

  async findOne(user: LoginUserDto): Promise<User> {
    let res = await this.userRepository.findOneOrFail({
      where: {
        username: user.username
      }
    })
    if (!res) {
      // 不存在该用户
    }
    let isMatched = await compare(user.password, res.password);
    return isMatched ? res : null;
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
