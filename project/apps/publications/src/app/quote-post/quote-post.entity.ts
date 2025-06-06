import { Entity } from '@project/lib/core';
import { QuotePost } from '@project/lib/shared/app/types';

export class QuotePostEntity implements QuotePost, Entity<string, QuotePost> {
  public id?: string;
  public author: string;
  public content: string;

  constructor(data: QuotePost) {
    this.populate(data);
  }

  public populate(data: QuotePost) {
    this.id = data.id
    this.author = data.author;
    this.content = data.content;
  }

  public toObject(): QuotePost {
    return {
      id: this.id,
      author: this.author,
      content: this.content
    }
  }

  static fromObject(data: QuotePost) {
    return new QuotePostEntity(data);
  }
}
