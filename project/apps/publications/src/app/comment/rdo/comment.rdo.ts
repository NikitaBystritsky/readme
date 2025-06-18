import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { CONTENT_PROPERTY, CREATED_AT_PROPERTY, ID_PROPERTY, USER_ID_PROPERTY } from '../comment.constant';

export class CommentRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @Expose()
  public content: string;

  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: CREATED_AT_PROPERTY.DESCRIPTION,
    example: CREATED_AT_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt: Date;
}
