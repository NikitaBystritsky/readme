import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { File } from '@project/lib/shared/app/types';

@Schema({
  collection: 'files',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class FilesModel extends Document implements File {
  public id?: string;

  @Prop({
    required: true
  })
  public originalName: string;

  @Prop({
    required: true
  })
  public subDirectory: string;

  @Prop({
    required: true
  })
  public catalog: string;

  @Prop({
    required: true
  })
  public size: number;

  @Prop({
    required: true
  })
  public mimetype: string;

  @Prop({
    required: true
  })
  public hashName: string;

  @Prop({
    required: true
  })
  public path: string;
}

export const FilesSchema = SchemaFactory.createForClass(FilesModel);

FilesSchema.virtual('id').get(function() {
  return this._id.toString();
});
