import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { CONTENT_PROPERTY, PREVIEW_PROPERTY, TITLE_PROPERTY } from '../text-post.constant';

export class TextPostRDO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  @Expose()
  public preview: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @Expose()
  public content: string;
}
