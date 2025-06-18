import { LinkPost } from './link-post.interface';
import { PhotoPost } from './photo-post.interface';
import { PostTags } from './post-tags.interface';
import { QuotePost } from './quote-post.interface';
import { TextPost } from './text-post.interface';
import { Timestamps } from './timestamps.interface';
import { VideoPost } from './video-post.interface';
import { PostStatus, PostType } from './post.enum';
import { User } from './user.interface';

export interface Post extends Timestamps {
  id?: string;
  type: `${PostType}`;
  status: `${PostStatus}`;
  userId: string;
  publishedDate?: Date;
  repost?: boolean;
  originalUserId?: string;
  originalPublicationId?: string;
  link?: LinkPost;
  photo?: PhotoPost;
  quote?: QuotePost;
  video?: VideoPost;
  text?: TextPost;
  tags?: PostTags;
  likeCount?: number;
  commentCount?: number;
  user?: string | User;
}
