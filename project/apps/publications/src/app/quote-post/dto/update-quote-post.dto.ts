import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, Length } from 'class-validator';

import {
  AUTHOR_LENGTH_MESSAGE,
  AuthorLength,
  AuthorProperty,
  CONTENT_LENGTH_MESSAGE,
  ContentLength,
  ContentProperty,
  TYPE_MESSAGE
} from '../quote-post.constant';

export class UpdateQuotePostDTO {
  @ApiProperty({
    description: AuthorProperty.DESCRIPTION,
    example: AuthorProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(AuthorLength.MIN, AuthorLength.MAX, {message: AUTHOR_LENGTH_MESSAGE})
  @IsOptional()
  public author?: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(ContentLength.MIN, ContentLength.MAX, {message: CONTENT_LENGTH_MESSAGE})
  @IsOptional()
  public content?: string;
}
