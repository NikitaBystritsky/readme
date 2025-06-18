import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Length } from 'class-validator';

import {
  TEXT_CONTENT_LENGTH_MESSAGE,
  TEXT_CONTENT_LENGTH,
  CONTENT_PROPERTY,
  PREVIEW_LENGTH_MESSAGE,
  PREVIEW_LENGTH,
  PREVIEW_PROPERTY,
  TITLE_LENGTH_MESSAGE,
  TITLE_LENGTH,
  TITLE_PROPERTY
} from './dto.constant';

export class CreateTextPostDTO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsNotEmpty()
  @Length(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX ,{message: TITLE_LENGTH_MESSAGE})
  public title: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsNotEmpty()
  @Length(PREVIEW_LENGTH.MIN, PREVIEW_LENGTH.MAX ,{message: PREVIEW_LENGTH_MESSAGE})
  public preview: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsNotEmpty()
  @Length(TEXT_CONTENT_LENGTH.MIN, TEXT_CONTENT_LENGTH.MAX ,{message: TEXT_CONTENT_LENGTH_MESSAGE})
  public content: string;
}
