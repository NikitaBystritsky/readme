import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ExtendUser } from '@project/lib/shared/app/types';
import { SCHEMA_COLLECTION } from './user.constant';

@Schema({
  collection: SCHEMA_COLLECTION,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class UserModel extends Document implements ExtendUser {
  @Prop({
    unique: true,
    required: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public password: string;

  @Prop({
    required: true
  })
  public fullName: string;

  @Prop()
  public avatar: string;

  @Prop()
  public subscriptions: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.virtual('id').get(function() {
  return this._id.toString();
});
