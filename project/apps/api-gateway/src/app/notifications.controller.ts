import { HttpService } from '@nestjs/axios';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseFilters
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Route } from '@project/lib/shared/app/types';

import { ApplicationServiceURL, NOTIFICATION_API_OPERATION, NOTIFICATION_MESSAGE, NOTIFICATION_ROUTE_PREFIX, NOTIFICATION_TAG, USER_EMAIL_API_QUERY } from './app.constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@ApiTags(NOTIFICATION_TAG)
@Controller(NOTIFICATION_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class NotificationsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: NOTIFICATION_MESSAGE
  })
  @ApiQuery({
    name: USER_EMAIL_API_QUERY.NAME,
    type: USER_EMAIL_API_QUERY.TYPE,
    description: USER_EMAIL_API_QUERY.DESCRIPTION
  })
  @ApiOperation({
    summary: NOTIFICATION_API_OPERATION.SUMMARY,
    description: NOTIFICATION_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.Root)
  public async sendNotification(
    @Query('email') email: string,
  ) {
    await this.httpService.axiosRef.post(`${ApplicationServiceURL.Notifications}`, null, {
      params: { email }
    });
  }
}
