import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';

import {
  REG_EXP,
  TITLE_LENGTH_MESSAGE,
  TITLE_TYPE_MESSAGE,
  TitleLength,
  TitleProperty,
  URL_MATCH_MESSAGE,
  URL_TYPE_MESSAGE,
  URLProperty
} from '../video-post.constant';

export class UpdateVideoPostDTO {
  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  @IsString({message: TITLE_TYPE_MESSAGE})
  @Length(TitleLength.MIN, TitleLength.MAX, {message: TITLE_LENGTH_MESSAGE})
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  @IsUrl({}, {message: URL_TYPE_MESSAGE})
  @Matches(REG_EXP, {message: URL_MATCH_MESSAGE})
  @IsOptional()
  public url?: string;
}
