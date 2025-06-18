import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import {
  PHOTO_PROPERTY,
} from './dto.constant';

export class UpdatePhotoPostDTO {
  @ApiProperty({
    description: PHOTO_PROPERTY.DESCRIPTION,
    example: PHOTO_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public image?: string;
}
