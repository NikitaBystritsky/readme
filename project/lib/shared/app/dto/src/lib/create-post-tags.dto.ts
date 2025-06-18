import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

import {
  MAX_TAGS,
  TAGS_LENGTH_MESSAGE,
  TAGS_PROPERTY
} from './dto.constant';

export class CreatePostTagDTO {
  @ApiProperty({
    description: TAGS_PROPERTY.DESCRIPTION,
    example: TAGS_PROPERTY.EXAMPLE
  })
  @IsArray()
  @IsString({ each: true }) 
  @MaxLength(MAX_TAGS, {message: TAGS_LENGTH_MESSAGE})
  @IsOptional()
  public tags: string[];
}
