import { ApiProperty } from '@nestjs/swagger';

import { ImageProperty } from '../photo-post.constant';

export class UpdatePhotoPostDTO {
  @ApiProperty({
    description: ImageProperty.DESCRIPTION,
    example: ImageProperty.EXAMPLE
  })
  public image?: string;
}
