import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiGatewayAppConfig } from '@project/lib/config/api-gateway';
import { Route } from '@project/lib/shared/app/types';

import {
  LIKE_POST_API_OPERATION,
  LIKE_ROUTE_PREFIX,
  LIKE_TAG,
  NOT_AUTHORIZED_RESPONSE,
  NOT_FOUND_BY_POST_ID_MESSAGE,
  POST_ID_API_PARAM,
  POST_ID_PARAM,
  POST_LIKE_MESSAGE,
  USER_ID_API_PARAM
} from './likes.constant';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { RequestHeader } from '../decorators/request-header.decorator';

@ApiTags(LIKE_TAG)
@Controller(LIKE_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class LikesController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ApiGatewayAppConfig.KEY) private readonly apiGatewayOptions: ConfigType<typeof ApiGatewayAppConfig>
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: POST_LIKE_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_BY_POST_ID_MESSAGE
  })
  @ApiParam({
    name: USER_ID_API_PARAM.NAME,
    type: USER_ID_API_PARAM.TYPE,
    description: USER_ID_API_PARAM.DESCRIPTION
  })
  @ApiParam({
    name: POST_ID_PARAM,
    type: POST_ID_API_PARAM.TYPE,
    description: POST_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: LIKE_POST_API_OPERATION.SUMMARY,
    description: LIKE_POST_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post(Route.Param)
  public async toggle(
    @Param('postId') postId: string,
    @Param('id') userId: string,
    @RequestHeader('authorization') authHeader: string
  ) {
    const url = new URL(`${postId}/like/${userId}`, this.apiGatewayOptions.postsServiceURL).toString();
    await this.httpService.axiosRef.post(url, {
      headers: { 'Authorization': authHeader },
    });
  }
}
