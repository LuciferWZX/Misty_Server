import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../../schemas/account.schema';
import { CacheService } from '../../cache/cache.service';
import { AuthorityModule } from '../authority/authority.module';
import { AuthModule } from '../../auth/auth.module';
import { CosModule } from '../../cos/cos.module';
import { Bank, BankSchema } from '../../schemas/bank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Bank.name, schema: BankSchema },
    ]),
    AuthorityModule,
    AuthModule,
    CosModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, CacheService],
})
export class AccountModule {}
