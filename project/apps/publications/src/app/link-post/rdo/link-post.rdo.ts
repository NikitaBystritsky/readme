import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { DescriptionProperty, URLProperty } from '../link-post.constant';

export class LinkPostRDO {
  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  @Expose()
  public url: string;

  @ApiProperty({
    description: DescriptionProperty.DESCRIPTION,
    example: DescriptionProperty.EXAMPLE
  })
  @Expose()
  public description: string;
}
