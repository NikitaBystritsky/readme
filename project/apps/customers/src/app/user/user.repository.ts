import mongoose, { Model } from 'mongoose';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/lib/core';

import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { createMessage } from '@project/lib/shared/helpers';
import { NOT_FOUND_MESSAGE } from 'lib/core/src/lib/repository/repository.constant';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    @InjectModel(UserModel.name) userModel: Model<UserModel>
  ) {
    super(userModel, UserEntity.fromObject);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }

  public async findByUserIds(ids: string[]): Promise<UserEntity[]> {
    const documents = await this.model.find({ _id: { $in: ids } });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async addOrDeleteSubscription(userId: string, subscribeId: string): Promise<UserEntity | null> {
    const existingUser = await this.model.findOne({ _id: new mongoose.Types.ObjectId(userId) });

    if(!existingUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_MESSAGE, [userId]));
    }
    const subscribeUser = await this.model.findOne({ _id: new mongoose.Types.ObjectId(subscribeId) });

    if(!subscribeUser) {
      throw new NotFoundException(createMessage(NOT_FOUND_MESSAGE, [subscribeId]));
    }
    const update = existingUser.subscriptions.includes(subscribeId)
      ? { $pull: { subscriptions: subscribeId } }
      : { $push: { subscriptions: subscribeId } };

    const document = await this.model.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userId) }, update, { new: true });

    return this.createEntityFromDocument(document);
  }

  public async getSubscribersCount(userId: string): Promise<number> {
    const document = await this.model.aggregate([
      { $match: { subscriptions: userId } },
      { $count: 'subscribersCount' },
    ]);

    return document.length > 0 ? document[0].subscribersCount : 0;
  }
}
