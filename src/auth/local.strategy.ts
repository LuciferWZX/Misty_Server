import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(): Promise<any> {
    const user = await this.authService.validateAccount();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
