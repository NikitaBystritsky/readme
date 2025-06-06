import { PostType } from '@project/lib/shared/app/types';

import { VideoPostService } from '../video-post/video-post.service';
import { LinkPostService } from '../link-post/link-post.service';
import { TextPostService } from '../text-post/text-post.service';
import { QuotePostService } from '../quote-post/quote-post.service';
import { PhotoPostService } from '../photo-post/photo-post.service';

export type PostContent = {
  [PostType.Video]: VideoPostService,
  [PostType.Link]: LinkPostService,
  [PostType.Text]: TextPostService,
  [PostType.Quote]: QuotePostService,
  [PostType.Photo]: PhotoPostService
}
