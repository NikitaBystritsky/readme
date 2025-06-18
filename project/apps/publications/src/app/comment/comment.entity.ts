import { Entity } from '@project/lib/core';

import { Comment } from '@project/lib/shared/app/types';
import { CreateCommentDTO } from '@project/lib/shared/app/dto';


export class CommentEntity implements Comment, Entity<string> {
  public id?: string;
  public content: string;
  public userId: string;
  public publicationId: string;
  public createdAt?: Date;

  public toObject() {
    return {
      id: this.id,
      content: this.content,
      userId: this.userId,
      publicationId: this.publicationId,
      createdAt: this.createdAt
    }

  }

  public populate(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.userId = comment.userId;
    this.publicationId = comment.publicationId;
    this.createdAt = comment.createdAt;

    return this;
  }

  static fromObject(comment: Comment) {
    return new CommentEntity().populate(comment);
  }

  static fromDto(postId: string, dto: CreateCommentDTO) {
    const entity = new CommentEntity();
    entity.content = dto.content;
    entity.userId = dto.userId;
    entity.publicationId = postId;

    return entity;
  }
}
