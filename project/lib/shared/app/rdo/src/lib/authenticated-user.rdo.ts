import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { ACCESS_PROPERTY, EMAIL_PROPERTY, ID_PROPERTY, REFRESH_PROPERTY } from './rdo.constant';

export class AuthenticatedUserRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: ACCESS_PROPERTY.DESCRIPTION,
    example: ACCESS_PROPERTY.EXAMPLE
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: REFRESH_PROPERTY.DESCRIPTION,
    example: REFRESH_PROPERTY.EXAMPLE
  })
  @Expose()
  public refreshToken: string;
}
