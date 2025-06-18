import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Subscriber } from '@project/lib/shared/app/types';

@Schema({
  collection: 'publications-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

export class PublicationsSubscriberModel extends Document implements Subscriber {
  @Prop({
    required: true
  })
  public email: string;
  @Prop({
    default: null
  })
  public lastNotification: null | Date;
  public id?: string;
}

export const PublicationsSubscriberSchema = SchemaFactory.createForClass(PublicationsSubscriberModel);

PublicationsSubscriberSchema.virtual('id').get(function() {
  return this._id.toString();
})
