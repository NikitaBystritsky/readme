import { ApiProperty } from '@nestjs/swagger';

import { DescriptionProperty, URLProperty } from '../link-post.constant';

export class UpdateLinkPostDTO {
  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  public url?: string;

  @ApiProperty({
    description: DescriptionProperty.DESCRIPTION,
    example: DescriptionProperty.EXAMPLE
  })
  public description?: string;
}
