import { Timestamps } from './timestamps.interface';

export interface PostTags extends Timestamps {
  id?: string;
  tags: string[];
}
