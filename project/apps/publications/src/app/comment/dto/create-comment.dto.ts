import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

import {
  CommentLength,
  CONTENT_LENGTH_MESSAGE,
  CONTENT_TYPE_MESSAGE,
  ContentProperty,
  REQUIRED_MESSAGE,
  USER_ID_TYPE_MESSAGE,
  UserIdProperty,
} from '../comment.constant';

export class CreateCommentDTO {
  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @IsString({message: CONTENT_TYPE_MESSAGE})
  @Length(CommentLength.MIN, CommentLength.MAX, {message: CONTENT_LENGTH_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public content: string;

  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @IsMongoId({message: USER_ID_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public userId: string;
}
