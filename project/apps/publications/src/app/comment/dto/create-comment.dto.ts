import { ApiProperty } from '@nestjs/swagger';

import { ContentProperty, UserIdProperty } from '../comment.constant';

export class CreateCommentDTO {
  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  public content: string;

  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  public userId: string;
}
