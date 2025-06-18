import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty } from 'class-validator';

import { REQUIRED_MESSAGE, TYPE_MESSAGE, USER_ID_PROPERTY } from '../like.constant';

export class LikeDTO {
  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @IsMongoId({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public userId: string;
}
