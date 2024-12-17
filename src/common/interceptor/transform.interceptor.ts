import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp(); // 获取请求上下文
    const request = ctx.getRequest(); // 获取请求上下文中的request对象
    const path = request.url;
    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: 200,
          message: '请求成功',
          data,
          timestamp: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          path,
        };
      }),
    );
  }
}
