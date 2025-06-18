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
  Post,
  Query
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/lib/shared/helpers';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentRDO } from './rdo/comment.rdo';
import { CommentService } from './comment.service';
import {
  COMMENT_CREATED_RESPONSE,
  COMMENT_DELETE_RESPONSE,
  COMMENTS_FOUND_RESPONSE,
  DEFAULT_MAX_COMMENT_COUNT,
  NOT_AUTHORIZED_RESPONSE,
  Route,
  ROUTE_PREFIX,
  TAG
} from './comment.constant';

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
    @Body() dto: CreateCommentDTO,
    @Param('postId') postId: string
  ) {
    const newComment = await this.commentService.createComment(postId, dto);

    return fillDto(CommentRDO, newComment.toObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: COMMENTS_FOUND_RESPONSE
  })
  @Get(Route.Root)
  public async show(
    @Param('postId') postId: string,
    @Query('count', new DefaultValuePipe(DEFAULT_MAX_COMMENT_COUNT), ParseIntPipe) count: number
  ) {
    const comments = await this.commentService.getCommentsByPostId(postId, {count});

    return fillDto(CommentRDO, comments.map((comment) => comment.toObject()));
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: COMMENT_DELETE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @Delete(Route.CommentParam)
  @HttpCode(204)
  public async destroy(@Param('id') id: string) {
    await this.commentService.deleteCommentById(id, '66e87f4f646c29eff76565a8');
  }
}
