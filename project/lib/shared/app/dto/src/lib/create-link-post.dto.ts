import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

import {
  DESCRIPTION_LENGTH_MESSAGE,
  DESCRIPTION_PROPERTY,
  MAX_DESCRIPTION_LENGTH,
  URL_PROPERTY
} from './dto.constant';

export class CreateLinkPostDTO {
  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @IsUrl()
  @IsNotEmpty()
  public url: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @IsString()
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: DESCRIPTION_LENGTH_MESSAGE})
  public description: string;
}
