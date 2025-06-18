import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import {
  PhotoProperty,
  REQUIRED_MESSAGE,
  TYPE_MESSAGE
} from '../photo-post.constant';

export class CreatePhotoPostDTO {
  @ApiProperty({
    description: PhotoProperty.DESCRIPTION,
    example: PhotoProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public image: string;
}
