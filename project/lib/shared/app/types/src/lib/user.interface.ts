import { Timestamps } from './timestamps.interface';

export interface User extends Timestamps {
  id?: string;
  email: string;
  fullName: string;
  avatar?: string;
}
