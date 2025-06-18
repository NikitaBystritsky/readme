import 'multer';

import FormData from 'form-data';

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
  Patch,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ApiGatewayAppConfig } from '@project/lib/config/api-gateway';
import { ParseFormDataJsonPipe } from '@project/lib/core';
import { fetchUserData } from '@project/lib/shared/helpers';
import { CreatePostDTO, UpdatePostDTO } from '@project/lib/shared/app/dto';
import { PostQuery } from '@project/lib/shared/app/query';
import {
  Pagination,
  Post as PostType,
  Route,
  TokenPayload,
  UploadCatalog
} from '@project/lib/shared/app/types';

import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { UserIdInterceptor } from '../interceptor/userid.interceptor';
import { RequestHeader } from '../decorators/request-header.decorator';
import { RequestContentType } from '../decorators/request-content-type.decorator';
import { RequestTokenPayload } from '../decorators/request-token-payload.decorator';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import {
  GET_BY_TAG_API_QUERY,
  GET_BY_TYPE_API_QUERY,
  GET_BY_USER_API_QUERY,
  GET_DRAFT_POSTS_API_OPERATION,
  GET_PAGE_API_QUERY,
  GET_POST_API_OPERATION,
  GET_POSTS_COUNT_API_QUERY,
  GET_POSTS_API_OPERATION,
  NOT_AUTHORIZED_RESPONSE,
  NOT_FOUND_BY_POST_ID_MESSAGE,
  ORDER_BY_DATE_API_QUERY,
  ORDER_BY_LIKES_API_QUERY,
  ORDER_BY_RATING_API_QUERY,
  POST_CREATE_API_OPERATION,
  POST_CREATED_RESPONSE,
  POST_DELETE_API_OPERATION,
  POST_DELETE_RESPONSE,
  POST_FOUND_RESPONSE,
  POST_ID_API_PARAM,
  POST_REPOST_API_OPERATION,
  POST_REPOSTED_RESPONSE,
  POST_TYPE,
  POST_UPDATE_API_OPERATION,
  POST_UPDATE_RESPONSE,
  POSTS_FOUND_RESPONSE,
  POSTS_SEARCH_API_OPERATION,
  PUBLICATION_ROUTE_PREFIX,
  PUBLICATION_TAG,
  REPOST_ERROR_MESSAGE,
  SEARCH_BY_TITTLE_API_QUERY,
  VALIDATION_ERROR_RESPONSE,
  POST_REPOST_ERROR_MESSAGE
} from './publications.constant';

@ApiTags(PUBLICATION_TAG)
@Controller(PUBLICATION_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class PublicationsController {
  constructor(
      private readonly httpService: HttpService,
      @Inject(ApiGatewayAppConfig.KEY) private readonly apiGatewayOptions: ConfigType<typeof ApiGatewayAppConfig>
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: POST_CREATED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiOperation({
    summary: POST_CREATE_API_OPERATION.SUMMARY,
    description: POST_CREATE_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(FileInterceptor(UploadCatalog.Photo), UserIdInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Create)
  public async create(
    @Body(ParseFormDataJsonPipe) dto: CreatePostDTO,
    @RequestHeader('authorization') authHeader: string,
    @RequestContentType() contentType: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await fetchUserData(dto.userId, this.apiGatewayOptions.usersServiceURL);

    if (contentType.includes('multipart/form-data') && file && dto.type === POST_TYPE) {
      const formData = new FormData();
      formData.append(UploadCatalog.Photo, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype
      });
      const filesURL = new URL('upload', this.apiGatewayOptions.filesServiceURL).toString();
      const { data: image } = await this.httpService.axiosRef.post(filesURL, formData,
        { headers: formData.getHeaders() }
      );
      const postsURL = new URL(this.apiGatewayOptions.postsServiceURL).toString();
      const { data } = await this.httpService.axiosRef.post(postsURL,
        Object.assign(dto, { image: image.hashName }),
        { headers: { 'Authorization': authHeader }}
      );
      data.user = user;

      return data;
    }
    const url = new URL(this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.post(url, dto,
      { headers: { 'Authorization': authHeader }}
    );
    data.user = user;

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: POST_REPOSTED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: REPOST_ERROR_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: POST_REPOST_ERROR_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiOperation({
    summary: POST_REPOST_API_OPERATION.SUMMARY,
    description: POST_REPOST_API_OPERATION.DESCRIPTION,
  })
  @ApiParam({
    name: POST_ID_API_PARAM.NAME,
    type: POST_ID_API_PARAM.TYPE,
    description: POST_ID_API_PARAM.DESCRIPTION
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Repost)
  public async repost(
    @Param('id') id: string,
    @RequestHeader('authorization') authHeader: string,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const url = new URL(`${id}/repost`, this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.post(url, null,
      {
        headers: { 'Authorization': authHeader },
        params: { userId: tokenPayload.sub }
      }
    );
    data.user = await fetchUserData(data.user, this.apiGatewayOptions.usersServiceURL);

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_FOUND_RESPONSE
  })
  @ApiOperation({
    summary: GET_POSTS_API_OPERATION.SUMMARY,
    description: GET_POSTS_API_OPERATION.DESCRIPTION,
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
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async index(@Query() query: PostQuery) {
    const url = new URL(this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.get<Pagination<PostType>>(url, { params: query });
    const userIds = data.entities.map((post) => post.user as string);
    const users = await fetchUserData(userIds, this.apiGatewayOptions.usersServiceURL);
    data.entities.map((post) => post.user = users.find((user) => user.id === post.user));

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiOperation({
    summary: GET_DRAFT_POSTS_API_OPERATION.SUMMARY,
    description: GET_DRAFT_POSTS_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(Route.Draft)
  public async getDrafts(
    @RequestHeader('authorization') authHeader: string,
    @RequestTokenPayload() tokenPayload: TokenPayload
  ) {
    const url = new URL('draft', this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.get<PostType[]>(url, {
      headers: { 'Authorization': authHeader },
      params: { userId: tokenPayload.sub }
    });
    const userIds = data.map((post) => post.user as string);
    const users = await fetchUserData(userIds, this.apiGatewayOptions.usersServiceURL);
    data.map((post) => post.user = users.find((user) => user.id === post.user));

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POST_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_BY_POST_ID_MESSAGE
  })
  @ApiParam({
    name: POST_ID_API_PARAM.NAME,
    type: POST_ID_API_PARAM.TYPE,
    description: POST_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: GET_POST_API_OPERATION.SUMMARY,
    description: GET_POST_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Get(Route.Param)
  public async show(@Param('id') id: string) {
    const url = new URL(id, this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.get(url);
    data.user = await fetchUserData(data.user, this.apiGatewayOptions.usersServiceURL);

    return data;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description:POST_UPDATE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: NOT_FOUND_BY_POST_ID_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_ERROR_RESPONSE
  })
  @ApiParam({
    name: POST_ID_API_PARAM.NAME,
    type: POST_ID_API_PARAM.TYPE,
    description: POST_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: POST_UPDATE_API_OPERATION.SUMMARY,
    description: POST_UPDATE_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Patch(Route.Update)
  public async update(
    @Param('id') id: string,
    @RequestHeader('authorization') authHeader: string,
    @Body() dto: UpdatePostDTO
  ) {
    const url = new URL(`${id}/update`, this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.patch(url, dto, {
      headers: { 'Authorization': authHeader }
    });
    data.user = await fetchUserData(data.user, this.apiGatewayOptions.usersServiceURL);

    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: POST_DELETE_RESPONSE
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
    name: POST_ID_API_PARAM.NAME,
    type: POST_ID_API_PARAM.TYPE,
    description: POST_ID_API_PARAM.DESCRIPTION
  })
  @ApiOperation({
    summary: POST_DELETE_API_OPERATION.SUMMARY,
    description: POST_DELETE_API_OPERATION.DESCRIPTION,
  })
  @UseGuards(CheckAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(Route.Param)
  public async delete(
    @Param('id') id: string,
    @RequestHeader('authorization') authHeader: string
  ) {
    const url = new URL(id, this.apiGatewayOptions.postsServiceURL).toString();
    await this.httpService.axiosRef.delete(url,
      { headers: { 'Authorization': authHeader } }
    );
  }

  @ApiResponse({
    status: HttpStatus.OK
  })
  @ApiQuery({
    name: SEARCH_BY_TITTLE_API_QUERY.NAME,
    type: SEARCH_BY_TITTLE_API_QUERY.TYPE,
    required: SEARCH_BY_TITTLE_API_QUERY.REQUIRED,
    description: SEARCH_BY_TITTLE_API_QUERY.DESCRIPTION
  })
  @ApiOperation({
    summary: POSTS_SEARCH_API_OPERATION.SUMMARY,
    description: POSTS_SEARCH_API_OPERATION.DESCRIPTION,
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.Search)
  public async search(@Query('title') title: string) {
    const url = new URL('search', this.apiGatewayOptions.postsServiceURL).toString();
    const { data } = await this.httpService.axiosRef.post<PostType[]>(url, null, {
      params: { title }
    });
    const userIds = data.map((post) => post.user as string);
    const users = await fetchUserData(userIds, this.apiGatewayOptions.usersServiceURL);
    data.map((post) => post.user = users.find((user) => user.id === post.user));

    return data;
  }
}


