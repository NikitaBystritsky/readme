import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, Length } from 'class-validator';

import {
  CONTENT_LENGTH_MESSAGE,
  ContentLength,
  ContentProperty,
  PREVIEW_LENGTH_MESSAGE,
  PreviewLength,
  PreviewProperty,
  TITLE_LENGTH_MESSAGE,
  TitleLength,
  TitleProperty,
  TYPE_MESSAGE
} from '../text-post.constant';

export class UpdateTextPostDTO {
  @ApiProperty({
    description: TitleProperty.DESCRIPTION,
    example: TitleProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(TitleLength.MIN, TitleLength.MAX ,{message: TITLE_LENGTH_MESSAGE})
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: PreviewProperty.DESCRIPTION,
    example: PreviewProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(PreviewLength.MIN, PreviewLength.MAX ,{message: PREVIEW_LENGTH_MESSAGE})
  @IsOptional()
  public preview?: string;

  @ApiProperty({
    description: ContentProperty.DESCRIPTION,
    example: ContentProperty.EXAMPLE
  })
  @IsString({message: TYPE_MESSAGE})
  @Length(ContentLength.MIN, ContentLength.MAX ,{message: CONTENT_LENGTH_MESSAGE})
  @IsOptional()
  public content?: string;
}
