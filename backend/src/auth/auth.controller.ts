import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { SignUpUserDto } from 'src/users/dtos/signup-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @HttpCode(200)
  async login(@Body() user: LoginUserDto) {
    return await this.authService.sigin(user);
  }

  @Post("signup")
  async signUp(@Body() input: SignUpUserDto) {
    return await this.authService.signUp(input);
  }

}
