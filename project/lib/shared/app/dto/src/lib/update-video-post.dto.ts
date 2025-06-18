import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';

import {
  REG_EXP,
  TITLE_LENGTH_MESSAGE,
  TITLE_LENGTH,
  TITLE_PROPERTY,
  VIDEO_URL_MATCH_MESSAGE,
  URL_PROPERTY
} from './dto.constant';

export class UpdateVideoPostDTO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @IsString()
  @Length(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX, {message: TITLE_LENGTH_MESSAGE})
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @IsUrl()
  @Matches(REG_EXP, {message: VIDEO_URL_MATCH_MESSAGE})
  @IsOptional()
  public url?: string;
}
