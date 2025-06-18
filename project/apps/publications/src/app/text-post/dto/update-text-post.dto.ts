import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, Length } from 'class-validator';

import {
  CONTENT_LENGTH_MESSAGE,
  CONTENT_LENGTH,
  CONTENT_PROPERTY,
  PREVIEW_LENGTH_MESSAGE,
  PREVIEW_LENGTH,
  PREVIEW_PROPERTY,
  TITLE_LENGTH_MESSAGE,
  TITLE_LENGTH,
  TITLE_PROPERTY,
  TYPE_MESSAGE
} from '../text-post.constant';

export class UpdateTextPostDTO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX ,{message: TITLE_LENGTH_MESSAGE})
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(PREVIEW_LENGTH.MIN, PREVIEW_LENGTH.MAX ,{message: PREVIEW_LENGTH_MESSAGE})
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(CONTENT_LENGTH.MIN, CONTENT_LENGTH.MAX ,{message: CONTENT_LENGTH_MESSAGE})
  @IsOptional()
  public content?: string;
}
