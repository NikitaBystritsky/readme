import { ApiProperty } from '@nestjs/swagger';

import { TagsProperty } from '../post-tags.constant';

export class CreatePostTagDTO {
  @ApiProperty({
    description: TagsProperty.DESCRIPTION,
    example: TagsProperty.EXAMPLE
  })
  public tags: string;
}
