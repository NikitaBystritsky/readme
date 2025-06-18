import { HttpException, HttpStatus } from '@nestjs/common';

import { createMessage } from '@project/lib/shared/helpers';

import { TOKEN_NOT_FOUND_ERROR } from './exceptions.constant';

export class TokenNotExistsExceptions extends HttpException {
  constructor(id: string) {
    super(createMessage(TOKEN_NOT_FOUND_ERROR, [id]), HttpStatus.UNAUTHORIZED)
  }
}
