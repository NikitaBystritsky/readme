import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { DESCRIPTION_PROPERTY, URL_PROPERTY } from './rdo.constant';

export class CreatedLinkPostRDO {
  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @Expose()
  public url: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @Expose()
  public description: string;
}
