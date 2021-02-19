/**
 *初始化swagger
 */
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * 初始化swagger
 * @param app
 */
export function initSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestServer 接口')
    .setDescription('所有NestServer接口文档')
    .setVersion('1.0.0')
    .addTag('Nest-Api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
