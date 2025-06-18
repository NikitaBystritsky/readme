import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const RequestHeader = createParamDecorator((name: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return request.headers[name];
})
