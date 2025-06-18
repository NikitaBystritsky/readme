import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length } from 'class-validator';

import {
  AUTHOR_LENGTH_MESSAGE,
  AUTHOR_LENGTH,
  AUTHOR_PROPERTY,
  CONTENT_LENGTH_MESSAGE,
  CONTENT_LENGTH,
  CONTENT_PROPERTY,
  REQUIRED_MESSAGE,
  TYPE_MESSAGE
} from '../quote-post.constant';

export class CreateQuotePostDTO {
  @ApiProperty({
    description: AUTHOR_PROPERTY.DESCRIPTION,
    example: AUTHOR_PROPERTY.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  @Length(AUTHOR_LENGTH.MIN, AUTHOR_LENGTH.MAX, {message: AUTHOR_LENGTH_MESSAGE})
  public author: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  @Length(CONTENT_LENGTH.MIN, CONTENT_LENGTH.MAX, {message: CONTENT_LENGTH_MESSAGE})
  public content: string;
}
