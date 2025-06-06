import { ApiProperty } from '@nestjs/swagger';

import { TitleProperty, URLProperty } from '../video-post.constant';

export class UpdateVideoPostDTO {
  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  public title?: string;

  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  public url?: string;
}
