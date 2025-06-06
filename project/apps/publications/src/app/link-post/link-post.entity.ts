import { Entity } from '@project/lib/core';
import { LinkPost } from '@project/lib/shared/app/types';

export class LinkPostEntity implements LinkPost, Entity<string, LinkPost> {
  public id?: string;
  public url: string;
  public description: string;

  constructor(data: LinkPost) {
    this.populate(data);
  }

  public populate(data: LinkPost) {
    this.id = data.id;
    this.url = data.url;
    this.description = data.description;
  }

  public toObject(): LinkPost {
    return {
      id: this.id,
      url: this.url,
      description: this.description
    }
  }

  static fromObject(data: LinkPost) {
    return new LinkPostEntity(data);
  }
}
