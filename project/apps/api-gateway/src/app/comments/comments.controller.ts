import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiGatewayAppConfig } from '@project/lib/config/api-gateway';
import { CreateCommentDTO } from '@project/lib/shared/app/dto';
import { Route, TokenPayload } from '@project/lib/shared/app/types';
import { CommentsQuery } from '@project/lib/shared/app/query';

import {
  COMMENT_CREATED_RESPONSE,
  COMMENT_DELETE_RESPONSE,
  COMMENT_ID_API_PARAM,
  COMMENT_ROUTE_PREFIX,
  COMMENT_TAG,
  COMMENTS_FOUND_RESPONSE,
  CREATE_COMMENT_API_OPERATION,
  DELETE_COMMENT_API_OPERATION,
  GET_COMMENTS_API_OPERATION,
  GET_COMMENTS_COUNT_API_QUERY,
  GET_PAGE_API_QUERY,
  NOT_AUTHORIZED_RESPONSE,
  NOT_FOUND_BY_POST_ID_MESSAGE,
  POST_ID_API_PARAM,
  POST_ID_PARAM,
  VALIDATION_ERROR_RESPONSE
} from './comments.constant';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptor/userid.interceptor';
import { RequestHeader } from '../decorators/request-header.decorator';
import { RequestTokenPayload } from '../decorators/request-token-payload.decorator';

@ApiTags(COMMENT_TAG)
@Controller(COMMENT_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(ApiGatewayAppConfig.KEY) private readonly apiGatewayOptions: ConfigType<typeof ApiGatewayAppConfig>
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENT_CREATED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_BY_POST_ID_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiParam({
    name: POST_ID_PARAM,
    type:  POST_ID_API_PARAM.TYPE,
    description:  POST_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: CREATE_COMMENT_API_OPERATION.SUMMARY,
    description: CREATE_COMMENT_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Root)
  public async create(
    @Body() dto: CreateCommentDTO,
    @Param('postId') postId: string,
    @RequestHeader('authorization') authHeader: string
  ) {
    const url = new URL(`${postId}/comments`, this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.post(url, dto, {
      headers: { 'Authorization': authHeader }
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENTS_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })@ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiParam({
    name: POST_ID_PARAM,
    type:  POST_ID_API_PARAM.TYPE,
    description:  POST_ID_API_PARAM.DESCRIPTION
  })
  @ApiQuery({
    name: GET_COMMENTS_COUNT_API_QUERY.NAME,
    type: GET_COMMENTS_COUNT_API_QUERY.TYPE,
    required: GET_COMMENTS_COUNT_API_QUERY.REQUIRED,
    description: GET_COMMENTS_COUNT_API_QUERY.DESCRIPTION
  })
  @ApiQuery({
    name: GET_PAGE_API_QUERY.NAME,
    type: GET_PAGE_API_QUERY.TYPE,
    required: GET_PAGE_API_QUERY.REQUIRED,
    description: GET_PAGE_API_QUERY.DESCRIPTION
  })
  @ApiOperation({
    summary: GET_COMMENTS_API_OPERATION.SUMMARY,
    description: GET_COMMENTS_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async show(
    @Param('postId') postId: string,
    @Query() query: CommentsQuery
  ) {
    const url = new URL(`${postId}/comments`, this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.get(url, {
      params: query
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: COMMENT_DELETE_RESPONSE
  })
  @ApiParam({
    name: POST_ID_PARAM,
    type: POST_ID_API_PARAM.TYPE,
    description: POST_ID_API_PARAM.DESCRIPTION
  })
  @ApiParam({
    name: COMMENT_ID_API_PARAM.NAME,
    type: COMMENT_ID_API_PARAM.TYPE,
    description: COMMENT_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: DELETE_COMMENT_API_OPERATION.SUMMARY,
    description: DELETE_COMMENT_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(Route.Param)
  public async delete(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @RequestHeader('authorization') authHeader: string,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const url = new URL(`${postId}/comments/${id}`, this.apiGatewayOptions.postsServiceURL).toString();
    await this.httpService.axiosRef.delete(url, {
      headers: { 'Authorization': authHeader },
      params: { userId: tokenPayload.sub }
    });
  }
}
