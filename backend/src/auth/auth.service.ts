import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from "@nestjs/jwt";
import { Role } from 'src/users/entities/role.entity';
import { jwtConstants } from './constants';
import { JwtPayload } from './jwt-payload.interface';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
    , private userService: UsersService) {

  }

  async login(user: LoginUserDto) {
    this.userService.findOne(user)
  }

  async getToken(payload: JwtPayload): Promise<any> {
    const accessToken = this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn
    });
    return { accessToken, refreshToken };
  }

  async verify(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async signUp() {

  }
}
