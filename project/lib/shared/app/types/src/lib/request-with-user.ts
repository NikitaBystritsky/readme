import { User } from './user.interface';

export interface RequestWithUser extends Request {
  user?: User;
}
