import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';

import { createMessage } from '@project/lib/shared/helpers';

import { HEADER_CUSTOM_PROPRIETARY, REQUEST_ID_ADDED } from './interceptor.constant';

export class RequestIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const requestId = crypto.randomUUID();
    const request = context.switchToHttp().getRequest<Request>();
    request.headers[HEADER_CUSTOM_PROPRIETARY] = requestId;
    Logger.log(createMessage(REQUEST_ID_ADDED, [request.method, request.url, requestId]));

    return next.handle();
  }
}
