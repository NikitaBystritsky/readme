import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

import {
  COMMENT_LENGTH,
  COMMENT_CONTENT_LENGTH_MESSAGE,
  COMMENT_CONTENT_PROPERTY,
  USER_ID_PROPERTY,
} from './dto.constant';

export class CreateCommentDTO {
  @ApiProperty({
    description: COMMENT_CONTENT_PROPERTY.DESCRIPTION,
    example: COMMENT_CONTENT_PROPERTY.EXAMPLE
  })
  @Length(COMMENT_LENGTH.MIN, COMMENT_LENGTH.MAX, {message: COMMENT_CONTENT_LENGTH_MESSAGE})
  @IsString()
  @IsNotEmpty()
  public content: string;

  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @IsMongoId()
  @IsNotEmpty()
  public userId: string;
}
