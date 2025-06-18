import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const RequestContentType = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  return request.headers['content-type'];
})
