import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionStatus } from './common.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: () => void): Promise<any> {
    const { method, path, headers } = req;
    //打印请求信息
    Logger.log(`请求------->[${method}]:[${path}]`);
    //第一步验证是否有当没有token的时候
    if (!headers.token) {
      notFindToken();
    }
    //第二步查看token是否过期
    await verifyToken(headers.token as string, this.authService);
    next();
  }
}

/**
 * todo
 * 没有token的时候，一般是没有登录获取token提示去登录
 */
function notFindToken(): void {
  throw new HttpException(
    {
      code: ExceptionStatus.NO_TOKEN,
      message: '无权限，请登录',
    },
    HttpStatus.UNAUTHORIZED,
  );
}

/**
 * todo
 * 严重redis里面有没有
 * @param token
 * @param auth
 */
async function verifyToken(token: string, auth: AuthService): Promise<void> {
  await auth.validateToken(token);
}
