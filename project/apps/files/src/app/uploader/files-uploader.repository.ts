import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/lib/core';

import { FilesEntity } from './files.entity';
import { FilesModel } from './files.model';

@Injectable()
export class FilesUploaderRepository extends BaseMongoRepository<FilesEntity, FilesModel> {
  constructor(
    @InjectModel(FilesModel.name) fileModel: Model<FilesModel>
  ) {
    super(fileModel, FilesEntity.fromObject);
  }
}
