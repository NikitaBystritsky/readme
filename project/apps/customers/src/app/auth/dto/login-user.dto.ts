import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import {
  EMAIL_TYPE_MESSAGE,
  EMAIL_PROPERTY,
  FIELD_TYPE_MESSAGE,
  PASSWORD_LENGTH,
  PASSWORD_PROPERTY,
  REQUIRED_MESSAGE
} from '../auth.constant';

export class LoginUserDTO {
  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @IsEmail({}, {message: EMAIL_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public email: string;

  @ApiProperty({
    description: PASSWORD_PROPERTY.DESCRIPTION,
    example: PASSWORD_PROPERTY.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX)
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public password: string;
}
