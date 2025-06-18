import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';

import {
  REG_EXP,
  TITLE_LENGTH_MESSAGE,
  TITLE_TYPE_MESSAGE,
  TITLE_LENGTH,
  TITLE_PROPERTY,
  URL_MATCH_MESSAGE,
  URL_TYPE_MESSAGE,
  URL_PROPERTY
} from '../video-post.constant';

export class UpdateVideoPostDTO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @IsString({message: TITLE_TYPE_MESSAGE})
  @Length(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX, {message: TITLE_LENGTH_MESSAGE})
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @IsUrl({}, {message: URL_TYPE_MESSAGE})
  @Matches(REG_EXP, {message: URL_MATCH_MESSAGE})
  @IsOptional()
  public url?: string;
}
