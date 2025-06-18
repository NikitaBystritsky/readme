import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class UserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body['userId'] = request.user.sub;

    return next.handle();
  }
}
