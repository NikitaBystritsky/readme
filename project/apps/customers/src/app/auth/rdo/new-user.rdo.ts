import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

import {
  AvatarProperty,
  CreatedAtProperty,
  EmailProperty,
  FullNameProperty,
  IdProperty
} from '../auth.constant';

export class NewUserRDO {
  @ApiProperty({
    description: IdProperty.DESCRIPTION,
    example: IdProperty.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: FullNameProperty.DESCRIPTION,
    example: FullNameProperty.EXAMPLE
  })
  @Expose()
  public fullName: string;

  @ApiProperty({
    description: EmailProperty.DESCRIPTION,
    example: EmailProperty.EXAMPLE
  })
  @Expose()
  public email: string

  @ApiProperty({
    description: AvatarProperty.DESCRIPTION,
    example: AvatarProperty.EXAMPLE
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: CreatedAtProperty.DESCRIPTION,
    example: CreatedAtProperty.EXAMPLE
  })
  @Expose()
  public createdAt: string;
}
