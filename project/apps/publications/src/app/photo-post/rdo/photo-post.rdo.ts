import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { ImageProperty } from '../photo-post.constant';

export class PhotoPostRDO {
  @ApiProperty({
    description: ImageProperty.DESCRIPTION,
    example: ImageProperty.EXAMPLE
  })
  @Expose()
  public image: string;
}
