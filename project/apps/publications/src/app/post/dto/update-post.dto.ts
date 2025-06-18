import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsISO8601, IsOptional } from 'class-validator';

import { PostStatus } from '@project/lib/shared/app/types';
import {
  AUTHOR_PROPERTY,
  CONTENT_PROPERTY,
  DATE_TYPE_MESSAGE,
  DESCRIPTION_PROPERTY,
  IMAGE_PROPERTY,
  POST_STATUS_MESSAGE,
  PREVIEW_PROPERTY,
  PUBLISHED_DATE_PROPERTY,
  STATUS_PROPERTY,
  TAGS_PROPERTY,
  TITLE_PROPERTY,
  URL_PROPERTY
} from '../post.constant';

export class UpdatePostDTO {
  @ApiProperty({
    enum: PostStatus,
    description: STATUS_PROPERTY.DESCRIPTION,
    example: STATUS_PROPERTY.EXAMPLE
  })
  @IsEnum(PostStatus, {message: POST_STATUS_MESSAGE})
  @IsOptional()
  public status?: PostStatus;

  @ApiProperty({
    description: PUBLISHED_DATE_PROPERTY.DESCRIPTION,
    example: PUBLISHED_DATE_PROPERTY.EXAMPLE
  })
  @IsISO8601({}, {message: DATE_TYPE_MESSAGE})
  @IsOptional()
  public publishedDate?: Date;

  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  public url?: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  public description?: string;

  @ApiProperty({
    description: IMAGE_PROPERTY.DESCRIPTION,
    example: IMAGE_PROPERTY.EXAMPLE
  })
  public image?: string;

  @ApiProperty({
    description: AUTHOR_PROPERTY.DESCRIPTION,
    example: AUTHOR_PROPERTY.EXAMPLE
  })
  public author?: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  public content?: string;

  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  public title?: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  public preview?: string;

  @ApiProperty({
    description: TAGS_PROPERTY.DESCRIPTION,
    example: TAGS_PROPERTY.EXAMPLE
  })
  public tags?: string[];
}
