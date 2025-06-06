import { Entity } from '@project/lib/core';
import { PhotoPost } from '@project/lib/shared/app/types';

export class PhotoPostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public id?: string;
  public image: string;

  constructor(data: PhotoPost) {
    this.populate(data);
  }

  public populate(data: PhotoPost) {
    this.id = data.id
    this.image = data.image;
  }

  public toObject(): PhotoPost {
    return {
      id: this.id,
      image: this.image
    }
  }

  static fromObject(data: PhotoPost) {
    return new PhotoPostEntity(data);
  }
}
