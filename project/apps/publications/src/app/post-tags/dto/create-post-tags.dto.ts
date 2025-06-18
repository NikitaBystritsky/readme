import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsOptional, MaxLength } from 'class-validator';

import { FIELD_TYPE_MESSAGE, MAX_TAGS, TAGS_LENGTH_MESSAGE, TAGS_PROPERTY } from '../post-tags.constant';

export class CreatePostTagDTO {
  @ApiProperty({
    description: TAGS_PROPERTY.DESCRIPTION,
    example: TAGS_PROPERTY.EXAMPLE
  })
  @IsArray({message: FIELD_TYPE_MESSAGE})
  @MaxLength(MAX_TAGS, {message: TAGS_LENGTH_MESSAGE})
  @IsOptional()
  public tags: string[];
}
