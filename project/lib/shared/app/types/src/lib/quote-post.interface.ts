import { Timestamps } from './timestamps.interface';

export interface QuotePost extends Timestamps {
  id?: string;
  content: string;
  author: string;
}
