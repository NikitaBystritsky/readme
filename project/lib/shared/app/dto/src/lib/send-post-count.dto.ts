import { IsMongoId, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { USER_ID_PROPERTY } from './dto.constant';

export class SendPostCount {
  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @IsMongoId()
  @IsNotEmpty()
  public userId: string;
}
