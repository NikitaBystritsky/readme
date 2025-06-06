import { Timestamps } from './timestamps.interface';

export interface VideoPost extends Timestamps {
  id?: string;
  title: string;
  url: string;
}
