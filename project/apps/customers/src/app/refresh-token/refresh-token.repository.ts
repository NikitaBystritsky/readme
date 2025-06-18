import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/lib/core';

import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';

export class RefreshTokenRepository extends BaseMongoRepository<RefreshTokenEntity, RefreshTokenModel> {
  constructor(
    @InjectModel(RefreshTokenModel.name) refreshTokenModel: Model<RefreshTokenModel>
  ) {
    super(refreshTokenModel, RefreshTokenEntity.fromObject)
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(tokenId: string) {
    return this.model.findOne({ tokenId }).exec();
  }

  public async deleteExpiredTokens() {
    return this.model.deleteMany({ expiresIn: { $lt: new Date() } })
  }
}
