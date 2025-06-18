import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

import {
  DESCRIPTION_LENGTH_MESSAGE,
  DESCRIPTION_TYPE_MESSAGE,
  DESCRIPTION_PROPERTY,
  MAX_DESCRIPTION_LENGTH,
  URL_TYPE_MESSAGE,
  URL_PROPERTY
} from '../link-post.constant';

export class UpdateLinkPostDTO {
  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @IsUrl({}, {message: URL_TYPE_MESSAGE})
  @IsOptional()
  public url?: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @IsString({message: DESCRIPTION_TYPE_MESSAGE})
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: DESCRIPTION_LENGTH_MESSAGE})
  @IsOptional()
  public description?: string;
}
