import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [PassportModule, JwtModule.register(jwtConfig)],
  providers: [AuthService, LocalStrategy, JwtStrategy, CacheService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
