import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CustomResponse } from '../common/common.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const dayjs = require('dayjs');
    const message = exception.message;
    Logger.error('错误提示', message);
    let responseJSON: any;
    try {
      if (exception) {
        const errResponse = exception.getResponse() as CustomResponse<null>;
        responseJSON = {
          data: {
            //timestamp: new Date().toISOString(),//获取的时间
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            url: request.originalUrl, // 错误的url地址
          }, // 获取全部的错误信息
          message: errResponse.message,
          code: errResponse.code, // 自定义code
        };
      } else {
        responseJSON = {
          data: {
            //timestamp: new Date().toISOString(),//获取的时间
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            url: request.originalUrl, // 错误的url地址
          }, // 获取全部的错误信息
          message: message,
          code: -1, // 自定义code
        };
      }
    } catch (e) {
      responseJSON = {
        data: {
          //timestamp: new Date().toISOString(),//获取的时间
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          url: request.originalUrl, // 错误的url地址
        }, // 获取全部的错误信息
        message: message,
        code: -1, // 自定义code
      };
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(responseJSON);
  }
}
