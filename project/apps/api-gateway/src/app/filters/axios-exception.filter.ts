import { AxiosError } from 'axios';

import { Response } from 'express';

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '../app.constant';

@Catch()
export class AxiosExceptionFilter extends BaseExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;

    response.status(status).json({statusCode: status, message});
  }
}
