import { ApiProperty } from '@nestjs/swagger';

import { PostStatus, PostType } from '@project/lib/shared/app/types';
import {
  AuthorProperty,
  ContentProperty,
  DescriptionProperty,
  ImageProperty,
  PreviewProperty,
  StatusProperty,
  TagsProperty,
  TitleProperty,
  TypeProperty,
  URLProperty,
  UserIdProperty
} from '../post.constant';

export class CreatePostDTO {
  @ApiProperty({
    enum: PostType,
    description: TypeProperty.DESCRIPTION,
    example: TypeProperty.EXAMPLE
  })
  public type: PostType;

  @ApiProperty({
    enum: PostStatus,
    description: StatusProperty.DESCRIPTION,
    example: StatusProperty.EXAMPLE
  })
  public status: PostStatus;

  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
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
  public tags?: string;
}
