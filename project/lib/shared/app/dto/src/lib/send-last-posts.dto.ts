import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { EMAIL_PROPERTY } from './dto.constant';

export class SendLastPostsDTO {
  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
