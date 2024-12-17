import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

/**
 * 获取错误消息
 */
export const getMessage = (exception: unknown) => {
  if (exception instanceof HttpException) {
    return exception.getResponse();
  } else {
    if (process.env.NODE_ENV === 'prod') {
      return '系统繁忙，请稍后再试';
    }
    if (exception instanceof QueryFailedError) {
      return exception.name + ': ' + exception.message;
    }
    return (
      (exception as any)?.response?.message ??
      (exception as any)?.message ??
      `${exception}`
    );
  }
};

/**
 * 获取状态
 */
export const getStatusCode = (exception: unknown) => {
  if (exception instanceof HttpException) {
    return exception.getStatus();
  }
  return HttpStatus.INTERNAL_SERVER_ERROR;
};
