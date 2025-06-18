import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { EMAIL_PROPERTY, FULL_NAME_PROPERTY, ID_PROPERTY } from './rdo.constant';

export class UserRDO {
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
}
