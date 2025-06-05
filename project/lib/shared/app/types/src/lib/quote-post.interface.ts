import { Post } from './post.interface';

export interface QuotePost extends Post {
  content: string;
  author: string;
}
