import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, Length } from 'class-validator';

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

export class UpdateTextPostDTO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX ,{message: TITLE_LENGTH_MESSAGE})
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(PREVIEW_LENGTH.MIN, PREVIEW_LENGTH.MAX ,{message: PREVIEW_LENGTH_MESSAGE})
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(TEXT_CONTENT_LENGTH.MIN, TEXT_CONTENT_LENGTH.MAX ,{message: TEXT_CONTENT_LENGTH_MESSAGE})
  @IsOptional()
  public content?: string;
}
