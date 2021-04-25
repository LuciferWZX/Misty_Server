import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './utils/initConfig';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import * as bodyParser from 'body-parser';
import { GlobalPrefix } from './utils/type';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GlobalPrefix.PREFIX);
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器全体返回值
  app.useGlobalInterceptors(new TransformInterceptor());
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  initSwagger(app);
  await app.listen(3000);
}
bootstrap().then();
