import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { PhotoProperty } from '../photo-post.constant';

export class PhotoPostRDO {
  @ApiProperty({
    description: PhotoProperty.DESCRIPTION,
    example: PhotoProperty.EXAMPLE
  })
  @Expose()
  public image: string;
}
