import { PostStatus, PostType } from './post.enum';

export interface Post {
  id?: string;
  teg?: string;
  type: PostType;
  status: PostStatus;
  userId: string;
  publishedDate?: Date;
  createdDate?: Date;
  likeCount?: number;
  commentCount?: number;
}
