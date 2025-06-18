import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { TITLE_PROPERTY, VIDEO_URL_PROPERTY } from './rdo.constant';

export class CreatedVideoPostRDO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: VIDEO_URL_PROPERTY.DESCRIPTION,
    example: VIDEO_URL_PROPERTY.EXAMPLE
  })
  @Expose()
  public url: string;
}

