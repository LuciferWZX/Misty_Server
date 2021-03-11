import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { Account } from '../schemas/account.schema';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'accountUsername',
      passwordField: 'accountPassword',
    });
    this.authService = authService;
  }
  async validate(
    accountUsername: string,
    accountPassword: string,
  ): Promise<string> {
    console.log(accountUsername, accountPassword);
    console.log(this.authService);
    return accountUsername;
    //await this.authService.validateUser(accountUsername, accountPassword);
    //throw new UnauthorizedException('incorrect username or password');
  }
}
