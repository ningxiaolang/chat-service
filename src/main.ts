import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from '@/common/exception-filter/all-exception.filter';
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 获取配置项
  const configService = app.get(ConfigService);
  const appConfig = configService.get('APP');
  const swaggerConfig = configService.get('SWAGGER');

  // 设置跨域
  app.enableCors();
  // 设置全局前缀
  app.setGlobalPrefix(appConfig.prefix);
  // 全局内置管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionFilter());
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerConfig.prefix, app, document);

  await app.listen(appConfig.port);
}
bootstrap();
