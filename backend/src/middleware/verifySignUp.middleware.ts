import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VerifySignUpMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.checkDuplicateUsername(req.body["username"]);
    if (user) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "The username has been signuped!",
      }, HttpStatus.BAD_REQUEST);
    }
    next();
  }
}
