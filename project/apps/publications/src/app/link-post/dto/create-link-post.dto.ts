import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

import {
  DESCRIPTION_LENGTH_MESSAGE,
  DESCRIPTION_TYPE_MESSAGE,
  DESCRIPTION_PROPERTY,
  MAX_DESCRIPTION_LENGTH,
  REQUIRED_MESSAGE,
  URL_TYPE_MESSAGE,
  URL_PROPERTY
} from '../link-post.constant';

export class CreateLinkPostDTO {
  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @IsUrl({}, {message: URL_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public url: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @IsString({message: DESCRIPTION_TYPE_MESSAGE})
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: DESCRIPTION_LENGTH_MESSAGE})
  public description: string;
}
