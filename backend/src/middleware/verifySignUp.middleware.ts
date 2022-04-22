import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VerifySignUpMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.findOne(req.body["username"]);
    if (user) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json()
      return;
    }
    next();
  }
}
