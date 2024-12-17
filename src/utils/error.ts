import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  ImATeapotException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  PayloadTooLargeException,
  RequestTimeoutException,
  UnauthorizedException,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';

@Injectable()
export class R {
  //400 客户端向服务器发送的请求有语法错误、格式不对或者请求参数不符合
  static BadRequest(message: string) {
    return new BadRequestException(message);
  }
  //401 客户端试图访问需要认证授权的资源，但没有提供有效的认证凭据
  static Unauthorized(message: string) {
    return new UnauthorizedException(message);
  }
  //403 客户端已经通过了认证，但是其具备的权限不足以访问所请求的资源
  static Forbidden(message: string) {
    return new ForbiddenException(message);
  }
  //404 客户端请求的资源在服务器上不存在，可能是请求的页面、文件、接口端点
  static NotFound(message: string) {
    return new NotFoundException(message);
  }
  //406 客户端在请求中通过 Accept 头部等方式指定了可接受的响应内容格式，但服务器无法按照这些要求提供对应的响应内容
  static NotAcceptable(message: string) {
    return new NotAcceptableException(message);
  }
  //408 客户端请求超时
  static RequestTimeout(message: string) {
    return new RequestTimeoutException(message);
  }
  //409 服务器在处理客户端请求时发生了冲突，导致客户端请求无法完成
  static Conflict(message: string) {
    return new ConflictException(message);
  }
  //410 请求的资源曾经存在过，但现在已经被永久性地移除了
  static Gone(message: string) {
    return new GoneException(message);
  }
  //413 请求实体太大，服务器无法处理
  static PayloadTooLarge(message: string) {
    return new PayloadTooLargeException(message);
  }
  //415 请求的媒体类型不受支持
  static UnsupportedMediaType(message: string) {
    return new UnsupportedMediaTypeException(message);
  }
  //418 请求的方法是被禁止的，服务器拒绝执行该方法
  static ImATeapot(message: string) {
    return new ImATeapotException(message);
  }
  //422 请求的实体无法被服务器理解,某些必填字段虽然有值但不符合特定验证逻辑
  static UnprocessableEntityEntity(message: string) {
    return new UnprocessableEntityException(message);
  }
  //500 服务器内部错误
  static InternalServer(message: string) {
    return new InternalServerErrorException(message);
  }
  //501 客户端请求的功能或者方法在服务器端还没有被实现，服务器暂时不支持该操作
  static NotImplemented(message: string) {
    return new NotImplementedException(message);
  }
}
