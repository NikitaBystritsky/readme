import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length } from 'class-validator';

import {
  AUTHOR_LENGTH_MESSAGE,
  AUTHOR_LENGTH,
  AUTHOR_PROPERTY,
  QUOTE_CONTENT_LENGTH_MESSAGE,
  QUOTE_CONTENT_LENGTH,
  CONTENT_PROPERTY
} from './dto.constant';

export class CreateQuotePostDTO {
  @ApiProperty({
    description: AUTHOR_PROPERTY.DESCRIPTION,
    example: AUTHOR_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsNotEmpty()
  @Length(AUTHOR_LENGTH.MIN, AUTHOR_LENGTH.MAX, {message: AUTHOR_LENGTH_MESSAGE})
  public author: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsNotEmpty()
  @Length(QUOTE_CONTENT_LENGTH.MIN, QUOTE_CONTENT_LENGTH.MAX, {message: QUOTE_CONTENT_LENGTH_MESSAGE})
  public content: string;
}
