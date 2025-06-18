import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

import {
  PhotoProperty,
  TYPE_MESSAGE
} from '../photo-post.constant';

export class UpdatePhotoPostDTO {
  @ApiProperty({
    description: PhotoProperty.DESCRIPTION,
    example: PhotoProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @IsOptional()
  public image?: string;
}
