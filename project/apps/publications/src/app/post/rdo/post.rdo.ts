import { Expose, Transform, Type } from 'class-transformer';

import { PostTagsRDO } from '../../post-tags/rdo/post-tags.rdo';
import { PostStatus, PostType } from '@project/lib/shared/app/types';
import { LinkPostRDO } from '../../link-post/rdo/link-post.rdo';
import { PhotoPostRDO } from '../../photo-post/rdo/photo-post.rdo';
import { QuotePostRDO } from '../../quote-post/rdo/quote-post.rdo';
import { VideoPostRDO } from '../../video-post/rdo/video-post.rdo';
import { TextPostRDO } from '../../text-post/rdo/text-post.rdo';

export class PostRDO {
  @Expose()
  public id: string;

  @Expose()
  public type: `${PostType}`;

  @Expose()
  public status: `${PostStatus}`;

  @Expose()
  public repost: boolean;

  @Expose()
  public publishedDate: string;

  @Expose()
  public originalUserId: string;

  @Expose()
  public originalPublicationId: string;

  @Expose()
  public likeCount: number;

  @Expose()
  public commentCount: number;

  @Expose()
  public userId: string;

  @Expose()
  @Type(() => LinkPostRDO)
  public link: LinkPostRDO;

  @Expose()
  @Type(() => PhotoPostRDO)
  public photo: PhotoPostRDO;

  @Expose()
  @Type(() => QuotePostRDO)
  public quote: QuotePostRDO;

  @Expose()
  @Type(() => VideoPostRDO)
  public video: VideoPostRDO;

  @Expose()
  @Type(() => TextPostRDO)
  public text: TextPostRDO;

  @Expose()
  @Type(() => PostTagsRDO)
  @Transform(({value}) => value && [...value.tags])
  public tags: string[];
}
