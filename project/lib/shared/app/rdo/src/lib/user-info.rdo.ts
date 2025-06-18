import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import {
  CREATED_AT_PROPERTY,
  ID_PROPERTY,
  POST_COUNT_PROPERTY,
  SUBSCRIBE_COUNT_PROPERTY
} from './rdo.constant';

export class UserInfoRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: CREATED_AT_PROPERTY.DESCRIPTION,
    example: CREATED_AT_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: POST_COUNT_PROPERTY.DESCRIPTION,
    example: POST_COUNT_PROPERTY.EXAMPLE
  })
  @Expose()
  public postCount: number;

  @ApiProperty({
    description: SUBSCRIBE_COUNT_PROPERTY.DESCRIPTION,
    example: SUBSCRIBE_COUNT_PROPERTY.EXAMPLE
  })
  @Expose()
  public subscribersCount: number;
}
