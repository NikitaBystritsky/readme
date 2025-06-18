import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUrl, Length, Matches } from 'class-validator';

import {
  REG_EXP,
  TITLE_LENGTH_MESSAGE,
  TITLE_LENGTH,
  TITLE_PROPERTY,
  VIDEO_URL_MATCH_MESSAGE,
  VIDEO_URL_PROPERTY
} from './dto.constant';

export class CreateVideoPostDTO {
  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsNotEmpty()
  @Length(TITLE_LENGTH.MIN, TITLE_LENGTH.MAX, {message: TITLE_LENGTH_MESSAGE})
  public title: string;

  @ApiProperty({
    description: VIDEO_URL_PROPERTY.DESCRIPTION,
    example: VIDEO_URL_PROPERTY.EXAMPLE
  })
  @IsUrl()
  @IsNotEmpty()
  @Matches(REG_EXP, {message: VIDEO_URL_MATCH_MESSAGE})
  public url: string;
}
