import { ApiProperty } from '@nestjs/swagger';

import { AuthorProperty, ContentProperty } from '../quote-post.constant';

export class CreateQuotePostDTO {
  @ApiProperty({
    description: AuthorProperty.DESCRIPTION,
    example: AuthorProperty.EXAMPLE
  })
  public author: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  public content: string;
}
