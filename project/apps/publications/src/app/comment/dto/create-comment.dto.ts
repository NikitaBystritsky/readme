import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

import {
  COMMENT_LENGTH,
  CONTENT_LENGTH_MESSAGE,
  CONTENT_TYPE_MESSAGE,
  CONTENT_PROPERTY,
  REQUIRED_MESSAGE,
  USER_ID_TYPE_MESSAGE,
  USER_ID_PROPERTY,
} from '../comment.constant';

export class CreateCommentDTO {
  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @IsString({message: CONTENT_TYPE_MESSAGE})
  @Length(COMMENT_LENGTH.MIN, COMMENT_LENGTH.MAX, {message: CONTENT_LENGTH_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public content: string;

  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @IsMongoId({message: USER_ID_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public userId: string;
}
