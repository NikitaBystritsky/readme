import { ApiProperty } from '@nestjs/swagger';

import { OldPasswordProperty, PasswordProperty } from '../auth.constant';

export class UpdateUserDTO {
  @ApiProperty({
    description: OldPasswordProperty.DESCRIPTION,
    example: OldPasswordProperty.EXAMPLE
  })
  public oldPassword: string;

  @ApiProperty({
    description: PasswordProperty.DESCRIPTION,
    example: PasswordProperty.EXAMPLE
  })
  public password: string;
}
