import { Expose, Transform, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

import { PostStatus, PostType, User } from '@project/lib/shared/app/types';

import { CreatedPostTagsRDO } from './created-post-tags.rdo';
import { CreatedLinkPostRDO } from './created-link-post.rdo';
import { CreatedPhotoPostRDO } from './created-photo-post.rdo';
import { CreatedQuotePostRDO } from './created-quote-post.rdo';
import { CreatedVideoPostRDO } from './created-video-post.rdo';
import { CreatedTextPostRDO } from './created-text-post.rdo';
import {
  COMMENT_COUNT_PROPERTY,
  ID_PROPERTY,
  LIKE_COUNT_PROPERTY,
  ORIGINAL_POST_ID_PROPERTY,
  ORIGINAL_USER_ID_PROPERTY,
  PUBLISHED_DATE_PROPERTY,
  REPOST_STATUS_PROPERTY,
  STATUS_PROPERTY,
  TYPE_PROPERTY,
  USER_ID_PROPERTY
} from './rdo.constant';

export class CreatedPostRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: TYPE_PROPERTY.DESCRIPTION,
    example: TYPE_PROPERTY.EXAMPLE
  })
  @Expose()
  public type: `${PostType}`;

  @ApiProperty({
    description: STATUS_PROPERTY.DESCRIPTION,
    example: STATUS_PROPERTY.EXAMPLE
  })
  @Expose()
  public status: `${PostStatus}`;

  @ApiProperty({
    description: REPOST_STATUS_PROPERTY.DESCRIPTION,
    example: REPOST_STATUS_PROPERTY.EXAMPLE
  })
  @Expose()
  public repost: boolean;

  @ApiProperty({
    description: PUBLISHED_DATE_PROPERTY.DESCRIPTION,
    example: PUBLISHED_DATE_PROPERTY.EXAMPLE
  })
  @Expose()
  public publishedDate: string;

  @ApiProperty({
    description: ORIGINAL_USER_ID_PROPERTY.DESCRIPTION,
    example: ORIGINAL_USER_ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public originalUserId: string;

  @ApiProperty({
    description: ORIGINAL_POST_ID_PROPERTY.DESCRIPTION,
    example: ORIGINAL_POST_ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public originalPublicationId: string;

  @ApiProperty({
    description: LIKE_COUNT_PROPERTY.DESCRIPTION,
    example: LIKE_COUNT_PROPERTY.EXAMPLE
  })
  @Expose()
  public likeCount: number;

  @ApiProperty({
    description: COMMENT_COUNT_PROPERTY.DESCRIPTION,
    example: COMMENT_COUNT_PROPERTY.EXAMPLE
  })
  @Expose()
  public commentCount: number;

  @ApiProperty({
    description: USER_ID_PROPERTY.DESCRIPTION,
    example: USER_ID_PROPERTY.EXAMPLE
  })
  @Expose({ name: 'userId' })
  public user: string;

  @Expose()
  @Type(() => CreatedLinkPostRDO)
  public link: CreatedLinkPostRDO;

  @Expose()
  @Type(() => CreatedPhotoPostRDO)
  public photo: CreatedPhotoPostRDO;

  @Expose()
  @Type(() => CreatedQuotePostRDO)
  public quote: CreatedQuotePostRDO;

  @Expose()
  @Type(() => CreatedVideoPostRDO)
  public video: CreatedVideoPostRDO;

  @Expose()
  @Type(() => CreatedTextPostRDO)
  public text: CreatedTextPostRDO;

  @Expose()
  @Type(() => CreatedPostTagsRDO)
  @Transform(({value}) => value && [...value.tags])
  public tags: string[];
}
