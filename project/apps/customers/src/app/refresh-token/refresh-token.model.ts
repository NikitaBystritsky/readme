import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { JwtToken } from '@project/lib/shared/app/types';

import { SCHEMA_COLLECTION } from './refresh-token.constant';

@Schema({
  collection: SCHEMA_COLLECTION,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true}
})
export class RefreshTokenModel extends Document implements JwtToken {
  @Prop({
    unique: true,
    required: true
  })
  public tokenId: string;

  @Prop({
    required: true
  })
  public userId: string;

  @Prop({
    required: true
  })
  public expiresIn: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);

RefreshTokenSchema.virtual('id').get(function() {
  return this._id.toString();
})
