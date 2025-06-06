import { ApiProperty } from '@nestjs/swagger';

import { EmailProperty, PasswordProperty } from '../auth.constant';

export class LoginUserDTO {
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
}
