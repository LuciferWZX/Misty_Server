import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './modules/account/account.module';
import { CacheModule } from './cache/cache.module';
import mongodbConfig from './config/mongodb.config';
import { AuthorityModule } from './modules/authority/authority.module';
import { CacheService } from './cache/cache.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { GlobalPrefix } from './utils/type';
import PREFIX = GlobalPrefix.PREFIX;
import { VideoModule } from './modules/video/video.module';
import { SubareaModule } from './modules/subarea/subarea.module';
import { Route } from './utils/route';

@Module({
  imports: [
    //mongodb的模块
    MongooseModule.forRoot(mongodbConfig.url, mongodbConfig.options),
    CacheModule,
    AuthorityModule,
    AccountModule,
    AuthModule,
    VideoModule,
    SubareaModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: `${PREFIX}/account/login`, method: RequestMethod.POST },
        { path: `${PREFIX}/account/create`, method: RequestMethod.POST },
        // { path: 'account/getImages', method: RequestMethod.GET },
        // { path: 'account/uploadImage', method: RequestMethod.POST },
      ) //排除要验证token的路由
      .forRoutes(
        { path: Route.account, method: RequestMethod.ALL },
        { path: Route.subarea, method: RequestMethod.ALL },
        { path: Route.video, method: RequestMethod.ALL },
      );
  }
}
