import { ConflictException, Injectable } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { LikeDTO } from './dto/like.dto';
import { PostService } from '../post/post.service';
import { PostStatus } from '@project/lib/shared/app/types';
import { POST_STATUS_ERROR_MESSAGE } from './like.constant';

@Injectable()
export class LikeService {
  constructor (
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService
  ) {}

  public async togglePostLike(postId: string, dto: LikeDTO) {
    const existsPost = await this.postService.getPostById(postId);

    if (existsPost.status !== PostStatus.Published) {
      throw new ConflictException(POST_STATUS_ERROR_MESSAGE)
    }

    const existsLike = await this.likeRepository.findByUserAndPostId(dto.userId, existsPost.id);

    if (existsLike) {
      return this.likeRepository.delete(existsLike.id);
    }

    const newLikePost = LikeEntity.fromDto(existsPost.id, dto);

    return this.likeRepository.save(newLikePost);
  }
}
