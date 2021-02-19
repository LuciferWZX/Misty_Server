import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): any {
    const { method, path } = req;
    console.log(`请求------->[${method}:${path}]`);
    next();
  }
}
