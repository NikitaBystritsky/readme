import { InternalServerErrorException } from '@nestjs/common';

import { Entity } from '@project/lib/core';
import { PostTags } from '@project/lib/shared/app/types';
import { CreatePostTagDTO } from './dto/create-post-tags.dto';
import {
  LENGTH_VALIDATE,
  REGEXP,
  START_WITH_LETTER_VALIDATE,
  TagLength
} from './post-tags.constant';

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
    this.validationTag(dto.tags);
    entity.tags = this.toUniqueArray(dto.tags).map((tag) => tag.toLowerCase());

    return entity;
  }

  static validationTag(tags: string[]) {
    tags.forEach((tag) => {
      if (!REGEXP.test(tag.at(0))) {
        throw new InternalServerErrorException(START_WITH_LETTER_VALIDATE);
      }

      if (tag.length < TagLength.MIN || tag.length > TagLength.MAX) {
        throw new InternalServerErrorException(LENGTH_VALIDATE);
      }
    });
  }

  static toUniqueArray(tags: string[]) {
    return [...new Set(tags).values()];
  }
}
