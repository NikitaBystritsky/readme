import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length } from 'class-validator';

import {
  AUTHOR_LENGTH_MESSAGE,
  AuthorLength,
  AuthorProperty,
  CONTENT_LENGTH_MESSAGE,
  ContentLength,
  ContentProperty,
  REQUIRED_MESSAGE,
  TYPE_MESSAGE
} from '../quote-post.constant';

export class CreateQuotePostDTO {
  @ApiProperty({
    description: AuthorProperty.DESCRIPTION,
    example: AuthorProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  @Length(AuthorLength.MIN, AuthorLength.MAX, {message: AUTHOR_LENGTH_MESSAGE})
  public author: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  @Length(ContentLength.MIN, ContentLength.MAX, {message: CONTENT_LENGTH_MESSAGE})
  public content: string;
}
