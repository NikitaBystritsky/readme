import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, Length } from 'class-validator';

import {
  FIELD_TYPE_MESSAGE,
  OldPasswordProperty,
  PASSWORD_LENGTH_MESSAGE,
  PasswordLength, PasswordProperty
} from '../auth.constant';

export class UpdateUserDTO {
  @ApiProperty({
    description: OldPasswordProperty.DESCRIPTION,
    example: OldPasswordProperty.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @Length(PasswordLength.MIN, PasswordLength.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsOptional()
  public oldPassword?: string;

  @ApiProperty({
    description: PasswordProperty.DESCRIPTION,
    example: PasswordProperty.EXAMPLE
  })
  @IsString({message: FIELD_TYPE_MESSAGE})
  @Length(PasswordLength.MIN, PasswordLength.MAX, {message: PASSWORD_LENGTH_MESSAGE})
  @IsOptional()
  public password?: string;
}
