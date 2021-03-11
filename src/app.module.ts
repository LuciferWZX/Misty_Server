import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { UsersModule } from './modules/user/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './modules/account/account.module';
import { CacheModule } from './cache/cache.module';
import mongodbConfig from './config/mongodb.config';
import { AuthorityModule } from './modules/authority/authority.module';
import { CacheService } from './cache/cache.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    //mongodb的模块
    MongooseModule.forRoot(mongodbConfig.url, mongodbConfig.options),
    CacheModule,
    AuthorityModule,
    AccountModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'account/login', method: RequestMethod.POST },
        { path: 'account/create', method: RequestMethod.POST },
      ) //排除要验证token的路由
      .forRoutes('account');
  }
}
