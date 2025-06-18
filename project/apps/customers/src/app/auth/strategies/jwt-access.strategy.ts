import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenPayload } from '@project/lib/shared/app/types';
import { CustomersJwtConfig } from '@project/lib/config/customers';

@Injectable()
export class JWTAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
     @Inject(CustomersJwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof CustomersJwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.accessTokenSecret
    });
  }

  public async validate(payload: TokenPayload) {
    return payload;
  }
}
