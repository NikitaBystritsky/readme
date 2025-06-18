import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

import { PostStatus, PostType } from '@project/lib/shared/app/types';
import {
  AuthorProperty,
  ContentProperty,
  DescriptionProperty,
  ImageProperty,
  POST_STATUS_MESSAGE,
  POST_TYPE_MESSAGE,
  PreviewProperty,
  REQUIRED_MESSAGE,
  StatusProperty,
  TagsProperty,
  TitleProperty,
  TypeProperty,
  URLProperty,
  USER_ID_TYPE_MESSAGE,
  UserIdProperty
} from '../post.constant';

export class CreatePostDTO {
  @ApiProperty({
    enum: PostType,
    description: TypeProperty.DESCRIPTION,
    example: TypeProperty.EXAMPLE
  })
  @IsEnum(PostType, {message: POST_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public type: PostType;

  @ApiProperty({
    enum: PostStatus,
    description: StatusProperty.DESCRIPTION,
    example: StatusProperty.EXAMPLE
  })
  @IsEnum(PostStatus, {message: POST_STATUS_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public status: PostStatus;

  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  @IsMongoId({message: USER_ID_TYPE_MESSAGE})
  @IsNotEmpty({message: REQUIRED_MESSAGE})
  public userId: string;

  @ApiProperty({
    description: URLProperty.DESCRIPTION,
    example: URLProperty.EXAMPLE
  })
  public url: string;

  @ApiProperty({
    description: DescriptionProperty.DESCRIPTION,
    example: DescriptionProperty.EXAMPLE
  })
  public description: string;

  @ApiProperty({
    description: ImageProperty.DESCRIPTION,
    example: ImageProperty.EXAMPLE
  })
  public image: string;

  @ApiProperty({
    description: AuthorProperty.DESCRIPTION,
    example: AuthorProperty.EXAMPLE
  })
  public author: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  public content: string;

  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  public title: string;

  @ApiProperty({
    description: PreviewProperty.DESCRIPTION,
    example: PreviewProperty.EXAMPLE
  })
  public preview: string;

  @ApiProperty({
    description: TagsProperty.DESCRIPTION,
    example: TagsProperty.EXAMPLE
  })
  public tags?: string[];
}
