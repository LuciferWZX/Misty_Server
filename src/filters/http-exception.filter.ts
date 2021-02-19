import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const dayjs=require('dayjs')
    const message = exception.message;
    Logger.log('错误提示', message);
    const errorResponse = {
      data: {
        reason: message,
        //timestamp: new Date().toISOString(),//获取的时间
        time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        url: request.originalUrl, // 错误的url地址
      }, // 获取全部的错误信息
      message: '请求失败',
      code: 100, // 自定义code

    };
    const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
