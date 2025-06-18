import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsISO8601, IsOptional } from 'class-validator';

import { PostStatus } from '@project/lib/shared/app/types';
import {
  AuthorProperty,
  ContentProperty,
  DATE_TYPE_MESSAGE,
  DescriptionProperty,
  ImageProperty,
  POST_STATUS_MESSAGE,
  PreviewProperty,
  PublishedDateProperty,
  StatusProperty,
  TagsProperty,
  TitleProperty,
  URLProperty
} from '../post.constant';

export class UpdatePostDTO {
  @ApiProperty({
    enum: PostStatus,
    description: StatusProperty.DESCRIPTION,
    example: StatusProperty.EXAMPLE
  })
  @IsEnum(PostStatus, {message: POST_STATUS_MESSAGE})
  @IsOptional()
  public status?: PostStatus;

  @ApiProperty({
    description: PublishedDateProperty.DESCRIPTION,
    example: PublishedDateProperty.EXAMPLE
  })
  @IsISO8601({}, {message: DATE_TYPE_MESSAGE})
  @IsOptional()
  public publishedDate?: Date;

  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  public url?: string;

  @ApiProperty({
    description: DescriptionProperty.DESCRIPTION,
    example: DescriptionProperty.EXAMPLE
  })
  public description?: string;

  @ApiProperty({
    description: ImageProperty.DESCRIPTION,
    example: ImageProperty.EXAMPLE
  })
  public image?: string;

  @ApiProperty({
    description: AuthorProperty.DESCRIPTION,
    example: AuthorProperty.EXAMPLE
  })
  public author?: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  public content?: string;

  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  public title?: string;

  @ApiProperty({
    description: PreviewProperty.DESCRIPTION,
    example: PreviewProperty.EXAMPLE
  })
  public preview?: string;

  @ApiProperty({
    description: TagsProperty.DESCRIPTION,
    example: TagsProperty.EXAMPLE
  })
  public tags?: string[];
}
