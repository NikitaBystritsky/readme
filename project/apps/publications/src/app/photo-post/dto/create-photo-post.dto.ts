import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import {
  PHOTO_PROPERTY,
  REQUIRED_MESSAGE,
  TYPE_MESSAGE
} from '../photo-post.constant';

export class CreatePhotoPostDTO {
  @ApiProperty({
    description: PHOTO_PROPERTY.DESCRIPTION,
    example: PHOTO_PROPERTY.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public image: string;
}
