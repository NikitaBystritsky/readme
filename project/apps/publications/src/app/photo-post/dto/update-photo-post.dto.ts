import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import {
  PHOTO_PROPERTY,
  TYPE_MESSAGE
} from '../photo-post.constant';

export class UpdatePhotoPostDTO {
  @ApiProperty({
    description: PHOTO_PROPERTY.DESCRIPTION,
    example: PHOTO_PROPERTY.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsOptional()
  public image?: string;
}
