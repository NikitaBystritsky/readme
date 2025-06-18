import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import {
  AVATAR_PROPERTY,
  CREATED_AT_PROPERTY,
  EMAIL_PROPERTY,
  FULL_NAME_PROPERTY,
  ID_PROPERTY
} from '../auth.constant';

export class NewUserRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: FULL_NAME_PROPERTY.DESCRIPTION,
    example: FULL_NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public fullName: string;

  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @Expose()
  public email: string

  @ApiProperty({
    description: AVATAR_PROPERTY.DESCRIPTION,
    example: AVATAR_PROPERTY.EXAMPLE
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: CREATED_AT_PROPERTY.DESCRIPTION,
    example: CREATED_AT_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt: string;
}
