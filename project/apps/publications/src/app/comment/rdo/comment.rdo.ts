import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { ContentProperty, CreatedAtProperty, IdProperty, UserIdProperty } from '../comment.constant';

export class CommentRDO {
  @ApiProperty({
    description: IdProperty.DESCRIPTION,
    example: IdProperty.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @Expose()
  public content: string;

  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: CreatedAtProperty.DESCRIPTION,
    example: CreatedAtProperty.EXAMPLE
  })
  @Expose()
  public createdAt: Date;
}
