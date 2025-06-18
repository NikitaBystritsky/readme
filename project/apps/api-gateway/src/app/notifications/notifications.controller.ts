import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  UseFilters
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiGatewayAppConfig } from '@project/lib/config/api-gateway';
import { Route } from '@project/lib/shared/app/types';

import {
  NOTIFICATION_API_OPERATION,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_ROUTE_PREFIX,
  NOTIFICATION_TAG,
  USER_EMAIL_API_QUERY
} from './notifications.constant';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';

@ApiTags(NOTIFICATION_TAG)
@Controller(NOTIFICATION_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class NotificationsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ApiGatewayAppConfig.KEY) private readonly apiGatewayOptions: ConfigType<typeof ApiGatewayAppConfig>
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
    const url = new URL(this.apiGatewayOptions.notificationsServiceURL).toString();
    await this.httpService.axiosRef.post(url, null, {
      params: { email }
    });
  }
}
