import { Controller, Post, Body, HttpCode, Req, HttpStatus, Res, } from '@nestjs/common';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { SignUpUserDto } from 'src/users/dtos/signup-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @HttpCode(200)
  async login(@Req() request: Request, @Res() response: Response) {
    let user = plainToClass(LoginUserDto, request.body);
    let result = await this.authService.sigin(user);
    if (!result) {
      return response.status(400).json({ status: HttpStatus.BAD_REQUEST, message: "username or password is not correct." });
    }
    response.cookie(result.cookie.cookieName, result.cookie.value, result.cookie.option);
    return response.status(200).json({ status: HttpStatus.OK, message: "login successfully!", data: result.payload });
  }

  @Post("signup")
  async signUp(@Body() input: SignUpUserDto) {
    return await this.authService.signUp(input);
  }

}
