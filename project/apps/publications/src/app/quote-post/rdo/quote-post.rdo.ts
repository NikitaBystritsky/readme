import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { AUTHOR_PROPERTY, CONTENT_PROPERTY } from '../quote-post.constant';

export class QuotePostRDO {
  @ApiProperty({
    description: AUTHOR_PROPERTY.DESCRIPTION,
    example: AUTHOR_PROPERTY.EXAMPLE
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @Expose()
  public content: string;
}
