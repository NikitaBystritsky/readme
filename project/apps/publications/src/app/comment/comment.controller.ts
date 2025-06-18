import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/lib/shared/helpers';
import { CreateCommentDTO } from '@project/lib/shared/app/dto';
import { CommentsWithPaginationRDO, CreatedCommentRDO } from '@project/lib/shared/app/rdo';
import { CommentService } from './comment.service';
import {
  COMMENT_CREATED_RESPONSE,
  COMMENT_DELETE_RESPONSE,
  COMMENTS_FOUND_RESPONSE,
  NOT_AUTHORIZED_RESPONSE,
  ROUTE_PREFIX,
  TAG
} from './comment.constant';
import { Route } from '@project/lib/shared/app/types';
import { CommentsQuery } from '@project/lib/shared/app/query';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENT_CREATED_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @Post(Route.Root)
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDTO
  ) {
    const newComment = await this.commentService.createComment(postId, dto);

    return fillDto(CreatedCommentRDO, newComment.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENTS_FOUND_RESPONSE
  })
  @Get(Route.Root)
  public async show(
    @Param('postId') postId: string,
    @Query() query: CommentsQuery
  ) {
    const comments = await this.commentService.getCommentsByPostId(postId, query);

    return fillDto(CommentsWithPaginationRDO, { ...comments, entities: comments.entities.map((post) => post.toObject()) }, { exposeDefaultValues: false });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: COMMENT_DELETE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @Delete(Route.Param)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string, @Query('userId') userId: string) {
    await this.commentService.deleteCommentById(id, userId);
  }
}
