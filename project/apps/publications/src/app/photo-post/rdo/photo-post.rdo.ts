import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { PHOTO_PROPERTY } from '../photo-post.constant';

export class PhotoPostRDO {
  @ApiProperty({
    description: PHOTO_PROPERTY.DESCRIPTION,
    example: PHOTO_PROPERTY.EXAMPLE
  })
  @Expose()
  public image: string;
}
