import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, Length } from 'class-validator';

import {
  FIELD_TYPE_MESSAGE,
  OLD_PASSWORD_PROPERTY,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_LENGTH, PASSWORD_PROPERTY
} from '../auth.constant';

export class UpdateUserDTO {
  @ApiProperty({
    description: OLD_PASSWORD_PROPERTY.DESCRIPTION,
    example: OLD_PASSWORD_PROPERTY.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsOptional()
  public oldPassword?: string;

  @ApiProperty({
    description: PASSWORD_PROPERTY.DESCRIPTION,
    example: PASSWORD_PROPERTY.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsOptional()
  public password?: string;
}
