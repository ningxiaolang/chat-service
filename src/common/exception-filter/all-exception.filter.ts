import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as dayjs from 'dayjs';
import { getMessage, getStatusCode } from '@/utils/fun-filter';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取请求上下文中的response对象
    const request = ctx.getRequest<Request>();

    const statusCode = getStatusCode(exception);
    const messageData = getMessage(exception);

    let message = messageData.message ? messageData.message : messageData;
    if (message instanceof Array) {
      message = message[0];
    }
    // 打印错误信息
    Logger.error(
      `Request error: ${request.method} ${request.url} ${JSON.stringify(message)}`,
      exception,
    );
    // 返回错误信息
    response.status(statusCode).json({
      statusCode,
      message: '请求失败',
      data: message,
      timestamp: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
    });
  }
}
