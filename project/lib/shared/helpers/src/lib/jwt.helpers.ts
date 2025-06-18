import { TokenPayload, User } from '@project/lib/shared/app/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email
  };
}
