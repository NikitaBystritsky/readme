import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCommentDTO } from '@project/lib/shared/app/dto';
import {Route, RequestWithTokenPayload} from '@project/lib/shared/app/types';
import { CommentsQuery } from '@project/lib/shared/app/query';

import {
  ApplicationServiceURL,
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
} from './app.constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptor/userid.interceptor';

@ApiTags(COMMENT_TAG)
@Controller(COMMENT_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
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
    @Param('postId') postId: string,
    @Req() req: Request,
    @Body() dto: CreateCommentDTO
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/${postId}/comments`, dto, {
      headers: { 'Authorization': req.headers['authorization'] }
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
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/${postId}/comments`, {
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
    @Req() req: RequestWithTokenPayload
  ) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${postId}/comments/${id}`, {
      headers: { 'Authorization': req.headers['authorization'] },
      params: { userId: req.user?.sub }
    });
  }
}
