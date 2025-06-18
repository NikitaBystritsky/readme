import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import {PHOTO_PROPERTY} from './dto.constant';

export class CreatePhotoPostDTO {
  @ApiProperty({
    description: PHOTO_PROPERTY.DESCRIPTION,
    example: PHOTO_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsNotEmpty()
  public image: string;
}
