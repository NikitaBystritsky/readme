import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { ContentProperty, PreviewProperty, TitleProperty } from '../text-post.constant';

export class TextPostRDO {
  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: PreviewProperty.DESCRIPTION,
    example: PreviewProperty.EXAMPLE
  })
  @Expose()
  public preview: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @Expose()
  public content: string;
}
