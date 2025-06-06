import { Timestamps } from './timestamps.interface';

export interface PhotoPost extends Timestamps {
  id?: string;
  image: string;
}
