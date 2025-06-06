import { Entity } from '@project/lib/core';
import { VideoPost } from '@project/lib/shared/app/types';

export class VideoPostEntity implements VideoPost, Entity<string, VideoPost> {
  public id?: string;
  public title: string;
  public url: string;

  constructor(data: VideoPost) {
    this.populate(data);
  }

  public populate(data: VideoPost) {
    this.id = data.id,
    this.title = data.title;
    this.url = data.url;
  }

  public toObject(): VideoPost {
    return {
      id: this.id,
      title: this.title,
      url: this.url
    }
  }

  static fromObject(data: VideoPost) {
    return new VideoPostEntity(data);
  }
}
