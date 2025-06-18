import { ConflictException, Injectable } from '@nestjs/common';

import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { PostService } from '../post/post.service';
import { PostStatus } from '@project/lib/shared/app/types';
import { POST_STATUS_ERROR_MESSAGE } from './like.constant';

@Injectable()
export class LikeService {
  constructor (
    private readonly likeRepository: LikeRepository,
    private readonly postService: PostService
  ) {}

  public async togglePostLike(postId: string, userId: string) {
    const existsPost = await this.postService.getPostById(postId);

    if (existsPost.status !== PostStatus.Published) {
      throw new ConflictException(POST_STATUS_ERROR_MESSAGE)
    }

    const existsLike = await this.likeRepository.findByUserAndPostId(userId, existsPost.id);

    if (existsLike) {
      return this.likeRepository.delete(existsLike.id);
    }

    const newLikePost = LikeEntity.fromDto(existsPost.id, userId);

    return this.likeRepository.save(newLikePost);
  }
}
