import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { json } from 'node:stream/consumers';
import { Observable } from 'rxjs';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { SignUpUserDto } from 'src/users/dtos/signup-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @HttpCode(200)
  async login(@Body() user: LoginUserDto) {
    return await this.authService.sigin(user);
  }

  @Post("signup")
  @HttpCode(200)
  async signUp(@Body() input: SignUpUserDto) {
    return await this.authService.signUp(input);
  }

}
