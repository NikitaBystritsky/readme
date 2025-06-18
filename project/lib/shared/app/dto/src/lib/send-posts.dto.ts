import { IsDate, IsEmail, IsNotEmpty } from 'class-validator'

import { ApiProperty } from '@nestjs/swagger';

import { EMAIL_PROPERTY, LAST_NOTIFICATION_DATE_PROPERTY } from './dto.constant';

export class SendPostsDTO {
  @ApiProperty({
    description: EMAIL_PROPERTY.DESCRIPTION,
    example: EMAIL_PROPERTY.EXAMPLE
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: LAST_NOTIFICATION_DATE_PROPERTY.DESCRIPTION,
    example: LAST_NOTIFICATION_DATE_PROPERTY.EXAMPLE
  })
  @IsDate()
  @IsNotEmpty()
  public lastNotification?: Date;
}
