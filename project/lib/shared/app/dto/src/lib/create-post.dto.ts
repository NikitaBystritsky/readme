import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

import { PostStatus, PostType } from '@project/lib/shared/app/types';
import {
  AUTHOR_PROPERTY,
  CONTENT_PROPERTY,
  DESCRIPTION_PROPERTY,
  IMAGE_PROPERTY,
  POST_STATUS_MESSAGE,
  POST_TYPE_MESSAGE,
  PREVIEW_PROPERTY,
  STATUS_PROPERTY,
  TAGS_PROPERTY,
  TITLE_PROPERTY,
  TYPE_PROPERTY,
  URL_PROPERTY,
  USER_ID_PROPERTY
} from './dto.constant';

export class CreatePostDTO {
  @ApiProperty({
    enum: PostType,
    description: TYPE_PROPERTY.DESCRIPTION,
    example: TYPE_PROPERTY.EXAMPLE
  })
  @IsEnum(PostType, {message: POST_TYPE_MESSAGE})
  @IsNotEmpty()
  public type: PostType;

  @ApiProperty({
    enum: PostStatus,
    description: STATUS_PROPERTY.DESCRIPTION,
    example: STATUS_PROPERTY.EXAMPLE
  })
  @IsEnum(PostStatus, {message: POST_STATUS_MESSAGE})
  @IsNotEmpty()
  public status: PostStatus;

  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @IsMongoId()
  @IsNotEmpty()
  public userId: string;

  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  @IsUrl()
  @IsOptional()
  public url: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public description: string;

  @ApiProperty({
    description: IMAGE_PROPERTY.DESCRIPTION,
    example: IMAGE_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public image: string;

  @ApiProperty({
    description: AUTHOR_PROPERTY.DESCRIPTION,
    example: AUTHOR_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public author: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public content: string;

  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public title: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  @IsString()
  @IsOptional()
  public preview: string;

  @ApiProperty({
    description: TAGS_PROPERTY.DESCRIPTION,
    example: TAGS_PROPERTY.EXAMPLE
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public tags?: string[];
}
