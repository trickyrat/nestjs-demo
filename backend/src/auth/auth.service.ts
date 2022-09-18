import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async signin(input: LoginUserDto): Promise<any> {
    let user = await this.userService.findOne(input);
    if (!user) {
      return null;
    }
    let isMatched = await compare(input.password, user.password)
    if (!isMatched) {
      return null;
    }
    let roles: string[] = user.roles.length == 0 ? [] : user.roles.map(x => x.name);
    let payload: JwtPayload = {
      username: user.username,
      nickname: user.nickname,
      roles: roles,
      permissions: []
    };
    const cookie = await this.getCookie(payload);

    return { payload: payload, cookie: cookie }
  }

  async getCookie(payload: JwtPayload): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.accessTokenExpiresIn
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn
    });
    return {
      cookieName: jwtConstants.cookiesName,
      value: accessToken + ";refreshToken=" + refreshToken,
      option: {
        httpOnly: true,
        path: "/",
        expires: new Date("2022-10-30T23:59:00")
      }
    }
  }

  async refresh(refreshToken: string): Promise<any> {
    let verifyResult = await this.jwtService.verifyAsync(refreshToken);
    if (!verifyResult) {
      throw new NotFoundException({ status: HttpStatus.NOT_FOUND, message: "Invalid refresh token." });
    }
    let accessToken = await this.jwtService.signAsync(this.jwtService.decode(refreshToken));
    return {
      cookieName: jwtConstants.cookiesName,
      value: accessToken + ";refreshToken=" + refreshToken,
      option: {
        httpOnly: true,
        path: "/",
        expires: new Date("2022-10-30T23:59:00")
      }
    };
  }


  async signUp(input: SignUpUserDto): Promise<any> {
    if (!await this.userService.checkDuplicateUsername(input.username)) {
      throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, message: "User has already exists!" });
    }
    if (input.roles.length > 0) {
      if (!(await this.userService.checkRolesExisted(input.roles))) {
        throw new NotFoundException({ status: HttpStatus.NOT_FOUND, message: "Not found roles!" });
      }
    }
    let res = await this.userService.insert(input);
    if (res) {
      return { status: HttpStatus.OK, message: "User was registered successfully!" };
    }
  }
}
