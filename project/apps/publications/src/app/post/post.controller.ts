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
  Query
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

import { Exchange, Queue, RabbitRouting, Route } from '@project/lib/shared/app/types';
import { fillDto } from '@project/lib/shared/helpers';

import { PostService } from './post.service';
import { CreatePostDTO, SendPostCount, SendPostsDTO, UpdatePostDTO } from '@project/lib/shared/app/dto';
import { PostQuery } from '@project/lib/shared/app/query';
import { CreatedPostRDO, PostsWithPaginationRDO } from '@project/lib/shared/app/rdo';
import {
  LATEST_POSTS_FOUND_RESPONSE,
  NOT_AUTHORIZED_RESPONSE,
  POST_CREATED_RESPONSE,
  POST_DELETE_RESPONSE,
  POST_FOUND_RESPONSE,
  POST_NOT_FOUND_RESPONSE,
  POST_REPOST_ERROR_MESSAGE,
  POST_REPOSTED_RESPONSE,
  POST_UPDATE_RESPONSE,
  POSTS_COUNT_FOUND_RESPONSE,
  POSTS_FOUND_BY_IDS_RESPONSE,
  POSTS_FOUND_RESPONSE,
  REPOST_ERROR_MESSAGE,
  ROUTE_PREFIX,
  TAG,
  VALIDATION_RESPONSE
} from './post.constant';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: POST_CREATED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Root)
  public async create(@Body() dto: CreatePostDTO) {
    const newPost = await this.postService.createPost(dto);

    return fillDto(CreatedPostRDO, newPost.toObject(), { exposeDefaultValues: false });
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
  @HttpCode(HttpStatus.CREATED)
  @Post(Route.Repost)
  public async repost(@Param('id') id: string, @Query('userId') userId: string) {
    const newPost = await this.postService.repostPost(id, userId);

    return fillDto(CreatedPostRDO, newPost.toObject(), { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_FOUND_RESPONSE
  })
  @HttpCode(HttpStatus.OK)
  @Get(Route.Root)
  public async index(@Query() query: PostQuery) {
    const posts = await this.postService.getAllPosts(query);

    return fillDto(PostsWithPaginationRDO, { ...posts, entities: posts.entities.map((post) => post.toObject()) }, { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @HttpCode(HttpStatus.OK)
  @Get(Route.Draft)
  public async getDrafts(@Query('userId') userId: string) {
    const posts = await this.postService.getPostsByDraftStatus(userId);

    return fillDto(CreatedPostRDO, posts.map((post) => post.toObject()), { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POST_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: POST_NOT_FOUND_RESPONSE
  })
  @HttpCode(HttpStatus.OK)
  @Get(Route.Param)
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);

    return fillDto(CreatedPostRDO, post.toObject(), { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description:POST_UPDATE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: POST_NOT_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: VALIDATION_RESPONSE
  })
  @HttpCode(HttpStatus.CREATED)
  @Patch(Route.Update)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDTO
  ) {
    const updatedPost = await this.postService.updatePostById(id, dto);

    return fillDto(CreatedPostRDO, updatedPost.toObject(), { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: POST_DELETE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: POST_NOT_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(Route.Param)
  public async delete(@Param('id') id: string) {
    await this.postService.deletePostById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.Search)
  public async search(@Query('title') title: string) {
    const posts = await this.postService.searchPostByTittle(title);

    return fillDto(CreatedPostRDO, posts.map((post) => post.toObject()), { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_FOUND_BY_IDS_RESPONSE
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.NewsFeed)
  public async getPostsByIds(@Body('ids') ids: string[], @Query() query: PostQuery) {
    const posts = await this.postService.getAllPosts(query, ids)

    return fillDto(PostsWithPaginationRDO, { ...posts, entities: posts.entities.map((post) => post.toObject()) }, { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: LATEST_POSTS_FOUND_RESPONSE
  })
  @RabbitRPC({
    exchange: Exchange.NotificationsExchange,
    routingKey: RabbitRouting.GetPublications,
    queue: Queue.GetPostsQueue
  })
  async getLatestPosts(message: SendPostsDTO) {
    return this.postService.getLatestPosts(message.lastNotification);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_COUNT_FOUND_RESPONSE
  })
  @RabbitRPC({
    exchange: Exchange.PublicationsExchange,
    routingKey: RabbitRouting.GetPublicationsCount,
    queue: Queue.GetPostsCountQueue
  })
  async getPostCount(message: SendPostCount) {
    return this.postService.getUserPostsCount(message.userId);
  }
}
