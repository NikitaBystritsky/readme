import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostQuery } from '@project/lib/shared/app/query';
import { ApiGatewayAppConfig } from '@project/lib/config/api-gateway';
import { Post, Route, TokenPayload } from '@project/lib/shared/app/types';

import {
  GET_BY_TAG_API_QUERY,
  GET_BY_TYPE_API_QUERY,
  GET_BY_USER_API_QUERY,
  GET_PAGE_API_QUERY,
  GET_POSTS_COUNT_API_QUERY,
  NEWS_FEED_API_OPERATION,
  NEWS_FEED_MESSAGE,
  NEWS_FEED_ROUTE_PREFIX,
  NEWS_FEED_TAG,
  NOT_AUTHORIZED_RESPONSE,
  ORDER_BY_DATE_API_QUERY,
  ORDER_BY_LIKES_API_QUERY,
  ORDER_BY_RATING_API_QUERY
} from './news-feed.constant';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { RequestHeader } from '../decorators/request-header.decorator';
import { RequestTokenPayload } from '../decorators/request-token-payload.decorator';

@ApiTags(NEWS_FEED_TAG)
@Controller(NEWS_FEED_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class NewsFeedController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ApiGatewayAppConfig.KEY) private readonly apiGatewayOptions: ConfigType<typeof ApiGatewayAppConfig>
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: NEWS_FEED_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiQuery({
    name: GET_BY_USER_API_QUERY.NAME,
    type: GET_BY_USER_API_QUERY.TYPE,
    required: GET_BY_USER_API_QUERY.REQUIRED,
    description: GET_BY_USER_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: GET_BY_TAG_API_QUERY.NAME,
    type: GET_BY_TAG_API_QUERY.TYPE,
    required: GET_BY_TAG_API_QUERY.REQUIRED,
    description: GET_BY_TAG_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: GET_BY_TYPE_API_QUERY.NAME,
    enum: GET_BY_TYPE_API_QUERY.ENUM,
    required: GET_BY_TYPE_API_QUERY.REQUIRED,
    description: GET_BY_TYPE_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: GET_POSTS_COUNT_API_QUERY.NAME,
    type: GET_POSTS_COUNT_API_QUERY.TYPE,
    required: GET_POSTS_COUNT_API_QUERY.REQUIRED,
    description: GET_POSTS_COUNT_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: GET_PAGE_API_QUERY.NAME,
    type: GET_PAGE_API_QUERY.TYPE,
    required: GET_PAGE_API_QUERY.REQUIRED,
    description: GET_PAGE_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: ORDER_BY_DATE_API_QUERY.NAME,
    enum: ORDER_BY_DATE_API_QUERY.ENUM,
    required: ORDER_BY_DATE_API_QUERY.REQUIRED,
    description: ORDER_BY_DATE_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: ORDER_BY_LIKES_API_QUERY.NAME,
    enum: ORDER_BY_LIKES_API_QUERY.ENUM,
    required: ORDER_BY_LIKES_API_QUERY.REQUIRED,
    description: ORDER_BY_LIKES_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: ORDER_BY_RATING_API_QUERY.NAME,
    enum: ORDER_BY_RATING_API_QUERY.ENUM,
    required: ORDER_BY_RATING_API_QUERY.REQUIRED,
    description: ORDER_BY_RATING_API_QUERY.DESCRIPTION
  })
  @ApiOperation({
    summary: NEWS_FEED_API_OPERATION.SUMMARY,
    description: NEWS_FEED_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async getNewsFeed(
    @Query() query: PostQuery,
    @RequestHeader('authorization') authHeader: string,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const usersURL = new URL(`${tokenPayload.sub}/subscribers`, this.apiGatewayOptions.usersServiceURL).toString();
    const { data: subscriptions } = await this.httpService.axiosRef.get<string[]>(usersURL,
      { headers: { 'Authorization': authHeader }
    });
    const postsURL = new URL('news-feed', this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.post<Post[]>(postsURL,
      { ids: subscriptions.concat(tokenPayload.sub) },
      {
        headers: { 'Authorization': authHeader },
        params: { query }
      }
    );

    return data;
  }
}
