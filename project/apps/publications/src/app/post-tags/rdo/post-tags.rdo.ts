import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TAGS_PROPERTY } from '../post-tags.constant';

export class PostTagsRDO {
  @ApiProperty({
    description: TAGS_PROPERTY.DESCRIPTION,
    example: TAGS_PROPERTY.EXAMPLE
  })
  @Expose()
  public tags: string[];
}
