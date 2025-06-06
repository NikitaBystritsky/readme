import { Entity } from '@project/lib/core';
import { TextPost } from '@project/lib/shared/app/types';

export class TextPostEntity implements TextPost, Entity<string, TextPost> {
  public id?: string;
  public title: string;
  public preview: string;
  public content: string;

  constructor(data: TextPost) {
    this.populate(data);
  }

  public populate(data: TextPost) {
    this.id = data.id,
    this.title = data.title;
    this.preview = data.preview;
    this.content = data.content;
  }

  public toObject(): TextPost {
    return {
      id: this.id,
      title: this.title,
      preview: this.preview,
      content: this.content
    }
  }

  static fromObject(data: TextPost) {
    return new TextPostEntity(data);
  }
}
