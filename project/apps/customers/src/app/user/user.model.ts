import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ExtendUser } from '@project/lib/shared/app/types';

@Schema({
  collection: 'users',
  timestamps: true
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
  password: string;

  @Prop({
    required: true
  })
  public fullName: string;

  @Prop()
  public avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
