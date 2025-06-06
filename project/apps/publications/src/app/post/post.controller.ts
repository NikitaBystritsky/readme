import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { fillDto } from '@project/lib/shared/helpers';
import { PostRDO } from './rdo/post.rdo';
import { PostType, SortType } from '@project/lib/shared/app/types';
import {
  DEFAULT_MAX_POST_COUNT,
  NOT_AUTHORIZED_RESPONSE,
  POST_CREATED_RESPONSE,
  POST_DELETE_RESPONSE,
  POST_FOUND_RESPONSE,
  POST_NOT_FOUND_RESPONSE,
  POST_REPOSTED_RESPONSE,
  POST_UPDATE_RESPONSE,
  POSTS_FOUND_RESPONSE,
  Route,
  ROUTE_PREFIX,
  TAG,
  VALIDATION_RESPONSE
} from './post.constant';
import { UpdatePostDTO } from './dto/update-post.dto';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
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
  @Post(Route.Root)
  public async create(@Body() dto: CreatePostDTO) {
    const newPost = await this.postService.createPost({...dto, userId: '66e87f4f646c29eff76565a8'});

    return fillDto(PostRDO, newPost.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POST_REPOSTED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @Post(Route.Repost)
  public async repost(
    @Param('id') id: string
  ) {
    const newPost = await this.postService.repostPost(id, '66e9d8681f48c49323a88c87');

    return fillDto(PostRDO, newPost.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_FOUND_RESPONSE
  })
  @Get(Route.Root)
  public async index(
    @Query('count', new DefaultValuePipe(DEFAULT_MAX_POST_COUNT), ParseIntPipe) count: number,
    @Query('type') type: PostType,
    @Query('tagName') tagName: string,
    @Query('userId') userId: string,
    @Query('sort', new DefaultValuePipe(SortType.Desc)) sort: SortType
  ) {
    const posts = await this.postService.getAllPosts({type, tagName, userId, sort, count});

    return fillDto(PostRDO, posts.map((post) => post.toObject()), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POSTS_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @Get(Route.Draft)
  public async getDrafts(
    @Query('sort', new DefaultValuePipe(SortType.Desc)) sort: SortType,
    @Query('count', new DefaultValuePipe(DEFAULT_MAX_POST_COUNT), ParseIntPipe) count: number
  ) {
    const posts = await this.postService.getPostsByDraftStatus({sort, count});

    return fillDto(PostRDO, posts.map((post) => post.toObject()), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POST_FOUND_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: POST_NOT_FOUND_RESPONSE
  })
  @Get(Route.PostParam)
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);

    return fillDto(PostRDO, post.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: POST_UPDATE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: POST_NOT_FOUND_RESPONSE
  })
  @Patch(Route.PostParam)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDTO
  ) {
    const updatedPost = await this.postService.updatePostById(id, dto);

    return fillDto(PostRDO, updatedPost.toObject(), {exposeDefaultValues: false});
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: POST_DELETE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: POST_NOT_FOUND_RESPONSE
  })
  @Delete(Route.PostParam)
  @HttpCode(204)
  public async delete(@Param('id') id: string) {
    await this.postService.deletePostById(id);
  }
}
