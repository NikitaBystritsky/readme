import 'multer';

import FormData from 'form-data';

import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ParseFormDataJsonPipe } from '@project/lib/core';
import { fetchUserData } from '@project/lib/shared/helpers';
import { CreatePostDTO, UpdatePostDTO } from '@project/lib/shared/app/dto';
import { PostQuery } from '@project/lib/shared/app/query';
import {
  Pagination,
  Post as PostType,
  RequestWithTokenPayload,
  Route,
  UploadCatalog
} from '@project/lib/shared/app/types';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { UserIdInterceptor } from './interceptor/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import {
  ApplicationServiceURL,
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
  VALIDATION_ERROR_RESPONSE
} from './app.constant';

@ApiTags(PUBLICATION_TAG)
@Controller(PUBLICATION_ROUTE_PREFIX)
@UseFilters(AxiosExceptionFilter)
export class PublicationsController {
  constructor(
      private readonly httpService: HttpService
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
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body(ParseFormDataJsonPipe) dto: CreatePostDTO
  ) {
    const contentType = req.headers['content-type'];
    const user = await fetchUserData(dto.userId);

    if (contentType.includes('multipart/form-data') && file && dto.type === POST_TYPE) {
      const formData = new FormData();
      formData.append(UploadCatalog.Photo, file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype
      });
      const { data: image } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData,
        { headers: { ...formData.getHeaders() }}
      );
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}`,
        {
          ...dto,
          image: image.hashName
        },
        { headers: { 'Authorization': req.headers['authorization'] }}
      );
      data.user = user;

      return data;
    }
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}`, dto,
      { headers: { 'Authorization': req.headers['authorization'] }}
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
  public async repost(@Param('id') id: string, @Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Posts}/${id}/repost`, null,
      {
        headers: { 'Authorization': req.headers['authorization'] },
        params: { userId: req.user?.sub }
      }
    );
    data.user = await fetchUserData(data.user);

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
    const { data } = await this.httpService.axiosRef.get<Pagination<PostType>>(`${ApplicationServiceURL.Posts}`, { params: query });
    const userIds = data.entities.map((post) => post.user as string);
    const users = await fetchUserData(userIds);
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
  public async getDrafts(@Req() req: RequestWithTokenPayload) {
    const { data } = await this.httpService.axiosRef.get<PostType[]>(`${ApplicationServiceURL.Posts}/draft`,{
      headers: { 'Authorization': req.headers['authorization'] },
      params: { userId: req.user?.sub }
    });
    const userIds = data.map((post) => post.user as string);
    const users = await fetchUserData(userIds);
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
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Posts}/${id}`);
    data.user = await fetchUserData(data.user);

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
    @Req() req: Request,
    @Body() dto: UpdatePostDTO
  ) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Posts}/${id}/update`, dto, {
      headers: { 'Authorization': req.headers['authorization'] }
    });
    data.user = await fetchUserData(data.user);

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
    @Req() req: Request
  ) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Posts}/${id}`,
      { headers: { 'Authorization': req.headers['authorization'] } }
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
    const { data } = await this.httpService.axiosRef.post<PostType[]>(`${ApplicationServiceURL.Posts}/search`, null, {
      params: { title }
    });
    const userIds = data.map((post) => post.user as string);
    const users = await fetchUserData(userIds);
    data.map((post) => post.user = users.find((user) => user.id === post.user));

    return data;
  }
}


