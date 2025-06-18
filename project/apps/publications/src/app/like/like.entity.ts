import { Entity } from '@project/lib/core';
import { Like } from '@project/lib/shared/app/types';

export class LikeEntity implements Like, Entity<string> {
  public id?: string;
  public publicationId: string;
  public userId: string;

  public toObject() {
    return {
      id: this.id,
      publicationId: this.publicationId,
      userId: this.userId
    }
  }

  public populate(data: Like) {
    this.id = data.id;
    this.publicationId = data.publicationId;
    this.userId = data.userId;

    return this;
  }

  static fromDto(postId: string, userId: string) {
    const entity = new LikeEntity();
    entity.publicationId = postId;
    entity.userId = userId;

    return entity;
  }

  static fromObject(data: Like) {
    return new LikeEntity().populate(data);
  }
}
