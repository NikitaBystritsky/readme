import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LikeService } from './like.service';
import { LikeDTO } from './dto/like.dto';
import {
  LIKE_STATUS_UPDATE_RESPONSE,
  NOT_AUTHORIZED_RESPONSE,
  Route,
  ROUTE_PREFIX,
  TAG
} from './like.constant';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: LIKE_STATUS_UPDATE_RESPONSE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @Post(Route.Root)
  public async toggle(
    @Body() dto: LikeDTO,
    @Param('postId') postId: string
  ) {
    await this.likeService.togglePostLike(postId, dto);
  }
}
