import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import { AccessProperty, EmailProperty, IdProperty } from '../auth.constant';

export class LoggedUserRDO {
  @ApiProperty({
    description: IdProperty.DESCRIPTION,
    example: IdProperty.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: EmailProperty.DESCRIPTION,
    example: EmailProperty.EXAMPLE
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: AccessProperty.DESCRIPTION,
    example: AccessProperty.EXAMPLE
  })
  @Expose()
  public accessToken: string;
}
