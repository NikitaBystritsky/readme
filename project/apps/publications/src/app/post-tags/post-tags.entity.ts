import { Entity } from '@project/lib/core';
import { PostTags } from '@project/lib/shared/app/types';
import { CreatePostTagDTO } from './dto/create-post-tags.dto';

export class PostTagsEntity implements PostTags, Entity<string, PostTags> {
  public id?: string;
  public tags: string[];

  public populate(data: PostTags) {
    this.id = data.id,
    this.tags = data.tags;

    return this;
  }

  public toObject(): PostTags {
    return {
      id: this.id,
      tags: this.tags
    }
  }

  static fromObject(data: PostTags) {
    return new PostTagsEntity().populate(data);
  }

  static fromDto(dto: CreatePostTagDTO) {
    const entity = new PostTagsEntity();
    entity.tags = this.toUniqueArray(dto.tags)

    return entity;
  }

  static toUniqueArray(tags: string) {
    const tagList = tags
      .split(/\s*#\s*/)
      .filter(Boolean)
      .map((element) => element
        .replace(/(.)/,'#$1')
        .toLowerCase()
      );

    return [...new Set(tagList).values()];
  }
}
