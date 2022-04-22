import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Headers } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDto } from 'src/users/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  async login(@Body() user: UserDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Headers() token: string) {
    const user = await this.authService.validateUser(token);
    return req.user;
  }
}
