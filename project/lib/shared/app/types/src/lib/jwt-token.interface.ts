import { Timestamps } from './timestamps.interface';

export interface JwtToken extends Timestamps {
  id?: string;
  tokenId: string;
  userId: string;
  expiresIn: Date;
}
