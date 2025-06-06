import { ApiProperty } from '@nestjs/swagger';

import { ContentProperty, PreviewProperty, TitleProperty } from '../text-post.constant';

export class CreateTextPostDTO {
  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  public title: string;

  @ApiProperty({
    description: PreviewProperty.DESCRIPTION,
    example: PreviewProperty.EXAMPLE
  })
  public preview: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  public content: string;
}
