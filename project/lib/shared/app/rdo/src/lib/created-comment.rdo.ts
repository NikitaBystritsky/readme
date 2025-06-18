import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { COMMENT_CONTENT_PROPERTY, CREATED_AT_PROPERTY, ID_PROPERTY, USER_ID_PROPERTY } from './rdo.constant';

export class CreatedCommentRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: COMMENT_CONTENT_PROPERTY.DESCRIPTION,
    example: COMMENT_CONTENT_PROPERTY.EXAMPLE
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
