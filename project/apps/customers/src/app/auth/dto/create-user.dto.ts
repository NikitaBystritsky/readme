import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, IsNotEmpty, Length, IsOptional  } from 'class-validator';

import {
  AVATAR_PROPERTY,
  EMAIL_TYPE_MESSAGE,
  EMAIL_PROPERTY,
  FIELD_TYPE_MESSAGE,
  FULL_NAME_LENGTH_MESSAGE,
  FULL_NAME_LENGTH,
  FULL_NAME_PROPERTY,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_LENGTH,
  PASSWORD_PROPERTY,
  REQUIRED_MESSAGE
} from '../auth.constant';

export class CreateUserDTO {
  @ApiProperty({
    description: FULL_NAME_PROPERTY.DESCRIPTION,
    example: FULL_NAME_PROPERTY.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @Length(FULL_NAME_LENGTH.MIN, FULL_NAME_LENGTH.MAX, {message: FULL_NAME_LENGTH_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public fullName: string;

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
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public password: string;

  @ApiProperty({
    description: AVATAR_PROPERTY.DESCRIPTION,
    example: AVATAR_PROPERTY.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @IsOptional()
  public avatar?: string;
}
