import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { UsersModule } from './modules/user/users.module';
import {MongooseModule} from "@nestjs/mongoose";
import mongodbConfig from './config/mongodb.config'
import {AccountModule} from "./modules/account/account.module";
import {CacheModule} from "./cache/cache.module";
@Module({
  imports: [
      AccountModule,
      UsersModule,
      CacheModule,
      //mongodb的模块
      MongooseModule.forRoot(mongodbConfig.url)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes('user');
  }
}
