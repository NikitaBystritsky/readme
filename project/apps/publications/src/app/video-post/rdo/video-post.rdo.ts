import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TitleProperty, URLProperty } from '../video-post.constant';

export class VideoPostRDO {
  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  @Expose()
  public url: string;
}

