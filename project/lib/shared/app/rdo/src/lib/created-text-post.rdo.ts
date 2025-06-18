import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { PREVIEW_PROPERTY, TEXT_CONTENT_PROPERTY, TITLE_PROPERTY } from './rdo.constant';

export class CreatedTextPostRDO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  @Expose()
  public preview: string;

  @ApiProperty({
    description: TEXT_CONTENT_PROPERTY.DESCRIPTION,
    example: TEXT_CONTENT_PROPERTY.EXAMPLE
  })
  @Expose()
  public content: string;
}
