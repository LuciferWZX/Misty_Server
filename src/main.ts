import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './utils/initConfig';
import {HttpExceptionFilter} from "./filters/http-exception.filter";
import {TransformInterceptor} from "./interceptor/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器全体返回值
  app.useGlobalInterceptors(new TransformInterceptor());
  initSwagger(app);
  await app.listen(3000);
}
bootstrap().then();
