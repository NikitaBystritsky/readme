import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsOptional, MaxLength } from 'class-validator';

import { FIELD_TYPE_MESSAGE, MAX_TAGS, TAGS_LENGTH_MESSAGE, TagsProperty } from '../post-tags.constant';

export class CreatePostTagDTO {
  @ApiProperty({
    description: TagsProperty.DESCRIPTION,
    example: TagsProperty.EXAMPLE
  })
  @IsArray({message: FIELD_TYPE_MESSAGE})
  @MaxLength(MAX_TAGS, {message: TAGS_LENGTH_MESSAGE})
  @IsOptional()
  public tags: string[];
}
