import { Timestamps } from './timestamps.interface';

export interface TextPost extends Timestamps {
  id?: string;
  title: string;
  preview: string;
  content: string;
}
