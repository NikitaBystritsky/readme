import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

import {
  DESCRIPTION_LENGTH_MESSAGE,
  DESCRIPTION_PROPERTY,
  MAX_DESCRIPTION_LENGTH,
  URL_PROPERTY
} from './dto.constant';

export class UpdateLinkPostDTO {
  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @IsUrl()
  @IsOptional()
  public url?: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @IsString()
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: DESCRIPTION_LENGTH_MESSAGE})
  @IsOptional()
  public description?: string;
}
