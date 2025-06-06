import { ApiProperty } from '@nestjs/swagger';

import {
  AvatarProperty,
  EmailProperty,
  FullNameProperty,
  PasswordProperty
} from '../auth.constant';

export class CreateUserDTO {
  @ApiProperty({
    description: FullNameProperty.DESCRIPTION,
    example: FullNameProperty.EXAMPLE
  })
  public fullName: string;

  @ApiProperty({
    description: EmailProperty.DESCRIPTION,
    example: EmailProperty.EXAMPLE
  })
  public email: string;

  @ApiProperty({
    description: PasswordProperty.DESCRIPTION,
    example: PasswordProperty.EXAMPLE
  })
  public password: string;

  @ApiProperty({
    description: AvatarProperty.DESCRIPTION,
    example: AvatarProperty.EXAMPLE
  })
  public avatar?: string;
}
