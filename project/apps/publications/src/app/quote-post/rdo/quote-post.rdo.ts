import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { AuthorProperty, ContentProperty } from '../quote-post.constant';

export class QuotePostRDO {
  @ApiProperty({
    description: AuthorProperty.DESCRIPTION,
    example: AuthorProperty.EXAMPLE
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @Expose()
  public content: string;
}
