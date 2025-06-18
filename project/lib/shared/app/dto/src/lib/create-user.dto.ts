import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, IsNotEmpty, Length, IsOptional  } from 'class-validator';

import {
  AVATAR_PROPERTY,
  EMAIL_PROPERTY,
  FULL_NAME_LENGTH_MESSAGE,
  FULL_NAME_LENGTH,
  FULL_NAME_PROPERTY,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_LENGTH,
  PASSWORD_PROPERTY
} from './dto.constant';

export class CreateUserDTO {
  @ApiProperty({
    description: FULL_NAME_PROPERTY.DESCRIPTION,
    example: FULL_NAME_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(FULL_NAME_LENGTH.MIN, FULL_NAME_LENGTH.MAX, {message: FULL_NAME_LENGTH_MESSAGE})
  @IsNotEmpty()
  public fullName: string;

  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: PASSWORD_PROPERTY.DESCRIPTION,
    example: PASSWORD_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    description: AVATAR_PROPERTY.DESCRIPTION,
    example: AVATAR_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public avatar?: string;
}
