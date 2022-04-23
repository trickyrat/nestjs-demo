import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from './constants';
import { JwtPayload } from './jwt-payload.interface';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { SignUpUserDto } from 'src/users/dtos/signup-user.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
    , private userService: UsersService) {

  }

  async sigin(input: LoginUserDto): Promise<any> {
    let user = await this.userService.findOne(input);
    if (!user) {
      return { status: HttpStatus.NOT_FOUND, message: "username or password is not correct." };
    }
    let isMatched = await compare(input.password, user.password)
    if (!isMatched) {
      return { status: HttpStatus.NOT_FOUND, message: "username or password is not correct." }
    }
    let roles: string[] = user.roles.length == 0 ? [] : user.roles.map(x => x.name);
    let payload: JwtPayload = {
      username: user.username,
      nickname: user.nickname,
      roles: roles,
      permissions: []
    };
    const { accessToken, refreshToken } = await this.getToken(payload);

    return { status: HttpStatus.OK, refreshToken: refreshToken, accessToken: accessToken, message: "login successfully!" }
  }

  async getToken(payload: JwtPayload): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.accessTokenExpiresIn
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn
    });
    return { accessToken, refreshToken };
  }

  async signUp(input: SignUpUserDto): Promise<any> {
    if (!await this.userService.checkDuplicateUsername(input.username)) {
      throw new HttpException({ status: HttpStatus.BAD_REQUEST, message: "User has already exists!" }, HttpStatus.BAD_REQUEST);
    }
    if (input.roles.length > 0) {
      if (!(await this.userService.checkRolesExisted(input.roles))) {
        throw new HttpException({ status: HttpStatus.NOT_FOUND, message: "Not found roles!" }, HttpStatus.NOT_FOUND);
      }
    }
    let res = await this.userService.insert(input);
    if (res) {
      return { status: HttpStatus.OK, message: "User was registered successfully!" };
    }
  }
}
