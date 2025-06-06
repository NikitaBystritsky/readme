import { Timestamps } from './timestamps.interface';

export interface LinkPost extends Timestamps {
  id?: string;
  url: string;
  description: string;
}
