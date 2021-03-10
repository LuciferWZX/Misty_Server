import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorityController } from './authority.controller';
import { AuthorityService } from './authority.service';
import { Authority, AuthoritySchema } from '../../schemas/authority.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Authority.name, schema: AuthoritySchema },
    ]),
  ],
  controllers: [AuthorityController],
  providers: [AuthorityService],
  exports: [AuthorityService], //导出模块的service
})
export class AuthorityModule {}
