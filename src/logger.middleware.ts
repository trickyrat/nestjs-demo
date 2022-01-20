import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { getNowString } from './utils/time';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("[%s] [%s] [url]: %s [Body]: %s",
      getNowString(),
      req.method,
      req.url,
      req.body)
    next();
  }
}
