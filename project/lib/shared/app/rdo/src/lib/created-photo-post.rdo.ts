import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { PHOTO_PROPERTY } from './rdo.constant';

export class CreatedPhotoPostRDO {
  @ApiProperty({
    description: PHOTO_PROPERTY.DESCRIPTION,
    example: PHOTO_PROPERTY.EXAMPLE
  })
  @Expose()
  public image: string;
}
