import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TAGS_PROPERTY } from './rdo.constant';

export class CreatedPostTagsRDO {
  @ApiProperty({
    description: TAGS_PROPERTY.DESCRIPTION,
    example: TAGS_PROPERTY.EXAMPLE
  })
  @Expose()
  public tags: string[];
}
