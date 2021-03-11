import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../../schemas/account.schema';
import { CacheService } from '../../cache/cache.service';
import { AuthorityModule } from '../authority/authority.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    AuthorityModule,
    AuthModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, CacheService],
})
export class AccountModule {}
