import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TITLE_PROPERTY, URL_PROPERTY } from '../video-post.constant';

export class VideoPostRDO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @Expose()
  public url: string;
}

