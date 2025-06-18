import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

import { PostStatus, PostType } from '@project/lib/shared/app/types';
import {
  AUTHOR_PROPERTY,
  CONTENT_PROPERTY,
  DESCRIPTION_PROPERTY,
  IMAGE_PROPERTY,
  POST_STATUS_MESSAGE,
  POST_TYPE_MESSAGE,
  PREVIEW_PROPERTY,
  REQUIRED_MESSAGE,
  STATUS_PROPERTY,
  TAGS_PROPERTY,
  TITLE_PROPERTY,
  TYPE_PROPERTY,
  URL_PROPERTY,
  USER_ID_TYPE_MESSAGE,
  USER_ID_PROPERTY
} from '../post.constant';

export class CreatePostDTO {
  @ApiProperty({
    enum: PostType,
    description: TYPE_PROPERTY.DESCRIPTION,
    example: TYPE_PROPERTY.EXAMPLE
  })
  @IsEnum(PostType, {message: POST_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public type: PostType;

  @ApiProperty({
    enum: PostStatus,
    description: STATUS_PROPERTY.DESCRIPTION,
    example: STATUS_PROPERTY.EXAMPLE
  })
  @IsEnum(PostStatus, {message: POST_STATUS_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public status: PostStatus;

  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @IsMongoId({message: USER_ID_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public userId: string;

  @ApiProperty({
    description: URL_PROPERTY.DESCRIPTION,
    example: URL_PROPERTY.EXAMPLE
  })
  public url: string;

  @ApiProperty({
    description: DESCRIPTION_PROPERTY.DESCRIPTION,
    example: DESCRIPTION_PROPERTY.EXAMPLE
  })
  public description: string;

  @ApiProperty({
    description: IMAGE_PROPERTY.DESCRIPTION,
    example: IMAGE_PROPERTY.EXAMPLE
  })
  public image: string;

  @ApiProperty({
    description: AUTHOR_PROPERTY.DESCRIPTION,
    example: AUTHOR_PROPERTY.EXAMPLE
  })
  public author: string;

  @ApiProperty({
    description: CONTENT_PROPERTY.DESCRIPTION,
    example: CONTENT_PROPERTY.EXAMPLE
  })
  public content: string;

  @ApiProperty({
    description: TITLE_PROPERTY.DESCRIPTION,
    example: TITLE_PROPERTY.EXAMPLE
  })
  public title: string;

  @ApiProperty({
    description: PREVIEW_PROPERTY.DESCRIPTION,
    example: PREVIEW_PROPERTY.EXAMPLE
  })
  public preview: string;

  @ApiProperty({
    description: TAGS_PROPERTY.DESCRIPTION,
    example: TAGS_PROPERTY.EXAMPLE
  })
  public tags?: string[];
}
