import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty } from 'class-validator';

import { REQUIRED_MESSAGE, TYPE_MESSAGE, UserIdProperty } from '../like.constant';

export class LikeDTO {
  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @IsMongoId({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public userId: string;
}
