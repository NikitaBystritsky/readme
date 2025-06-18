import dayjs from 'dayjs';

import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { CustomersJwtConfig } from '@project/lib/config/customers';
import { RefreshTokenPayload } from '@project/lib/shared/app/types';

import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { parseTime } from '@project/lib/shared/helpers';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(CustomersJwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof CustomersJwtConfig>
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const {value, unit} = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(value, unit).toDate()
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.deleteExpiredRefreshTokens();
    
    return this.refreshTokenRepository.deleteByTokenId(tokenId)
  }

  public async isExists(tokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);

    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
