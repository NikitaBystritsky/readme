import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TagsProperty } from '../post-tags.constant';

export class PostTagsRDO {
  @ApiProperty({
    description: TagsProperty.DESCRIPTION,
    example: TagsProperty.EXAMPLE
  })
  @Expose()
  public tags: string[];
}
