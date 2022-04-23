import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Headers } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { SignUpUserDto } from 'src/users/dtos/signup-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post("login")
  async login(@Body() user: LoginUserDto) {
    let result = this.authService.login(user);
    if (result) {

    }
    return
  }

  @Post("signup")
  async signUp(@Body() input: SignUpUserDto) {

  }

}
