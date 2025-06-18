import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, Length } from 'class-validator';

import {
  OLD_PASSWORD_PROPERTY,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_LENGTH, PASSWORD_PROPERTY
} from './dto.constant';

export class UpdatePasswordDTO {
  @ApiProperty({
    description: OLD_PASSWORD_PROPERTY.DESCRIPTION,
    example: OLD_PASSWORD_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsOptional()
  public oldPassword?: string;

  @ApiProperty({
    description: PASSWORD_PROPERTY.DESCRIPTION,
    example: PASSWORD_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsOptional()
  public password?: string;
}
