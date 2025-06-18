import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Post, RequestWithTokenPayload, Route } from '@project/lib/shared/app/types';

import {
  ApplicationServiceURL,
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
} from './app.constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { PostQuery } from '@project/lib/shared/app/query';

@ApiTags(NEWS_FEED_TAG)
@Controller(NEWS_FEED_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class NewsFeedController {
  constructor(
    private readonly httpService: HttpService
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
    @Req() req: RequestWithTokenPayload
  ) {
    const { data: subscriptions } = await this.httpService.axiosRef.get<string[]>(`${ApplicationServiceURL.Users}/${req.user?.sub}/subscribers`,
      { headers: { 'Authorization': req.headers['authorization'] }
    });
    const { data } = await this.httpService.axiosRef.post<Post[]>(`${ApplicationServiceURL.Posts}/news-feed`,
      { ids: subscriptions.concat(req.user?.sub) },
      {
        headers: { 'Authorization': req.headers['authorization'] },
        params: { query }
      }
    );

    return data;
  }
}
