import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import {
  EMAIL_TYPE_MESSAGE,
  EmailProperty,
  FIELD_TYPE_MESSAGE,
  PasswordLength,
  PasswordProperty,
  REQUIRED_MESSAGE
} from '../auth.constant';

export class LoginUserDTO {
  @ApiProperty({
    description: EmailProperty.DESCRIPTION,
    example: EmailProperty.EXAMPLE
  })
  @IsEmail({}, {message: EMAIL_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public email: string;

  @ApiProperty({
    description: PasswordProperty.DESCRIPTION,
    example: PasswordProperty.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @Length(PasswordLength.MIN, PasswordLength.MAX)
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public password: string;
}
