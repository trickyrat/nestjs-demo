import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';


@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    // let token = req.headers["Authorization"];
    // if (!token) {
    //   throw new HttpException({
    //     status: HttpStatus.FORBIDDEN,
    //     error: "No token provided!"
    //   }, HttpStatus.FORBIDDEN);
    // }
    // let user = await this.authService.verify(token);
    // if (!user) {
    //   throw new HttpException({
    //     status: HttpStatus.UNAUTHORIZED,
    //     error: "Unauthorized!"
    //   }, HttpStatus.UNAUTHORIZED);
    // }
    next();
  }
}
