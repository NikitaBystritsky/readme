import { Injectable, NotFoundException } from '@nestjs/common';

import { createMessage } from '@project/lib/shared/helpers';

import { NOT_FOUND_BY_ID_MESSAGE } from './comment.constant';
import { CommentRepository } from './comment.repository';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService
  ) {}

  public async getCommentById(commentId: string) {
    return this.commentRepository.findById(commentId);
  }

  public async getCommentsByPostId(postId: string, {count}) {
    return this.commentRepository.findByPostId(postId, {count});
  }

  public async createComment(postId: string, dto: CreateCommentDTO) {
    const existsPost = await this.postService.getPostById(postId);
    const newComment = CommentEntity.fromDto(existsPost.id, dto);

    return this.commentRepository.save(newComment);
  }

  public async deleteCommentById(commentId: string, userId: string) {
    try {
      await this.commentRepository.deleteById(commentId, userId);
    } catch {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [commentId]));
    }
  }
}
