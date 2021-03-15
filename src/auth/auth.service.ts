import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from '../schemas/account.schema';
import { CacheService } from '../cache/cache.service';
import { RedisKey } from '../config/redis.config';
import { ExceptionStatus } from '../common/common.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}
  /**
   * todo
   * 根据用户名和id生成token
   * @param account
   */
  async genAccountToken(account: Account): Promise<string> {
    const payload = {
      username: account.accountUsername,
      id: account.id,
      sub: account.id,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * todo
   * 根据redis查出来的用户
   * @param token
   */
  async validateToken(token: string) {
    const data: string[] = await this.cacheService.hKeys(RedisKey.accounts);
    //await this.cacheService.flushAll();
    if (!data.find((accountToken) => accountToken === token)) {
      throw new HttpException(
        {
          code: ExceptionStatus.TOKEN_EXPIRED,
          message: 'token过期，请重新登录',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
