import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

import {
  DESCRIPTION_LENGTH_MESSAGE,
  DESCRIPTION_TYPE_MESSAGE,
  DescriptionProperty,
  MAX_DESCRIPTION_LENGTH,
  REQUIRED_MESSAGE,
  URL_TYPE_MESSAGE,
  URLProperty
} from '../link-post.constant';

export class CreateLinkPostDTO {
  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  @IsUrl({}, {message: URL_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public url: string;

  @ApiProperty({
    description: DescriptionProperty.DESCRIPTION,
    example: DescriptionProperty.EXAMPLE
  })
  @IsString({message: DESCRIPTION_TYPE_MESSAGE})
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: DESCRIPTION_LENGTH_MESSAGE})
  public description: string;
}
