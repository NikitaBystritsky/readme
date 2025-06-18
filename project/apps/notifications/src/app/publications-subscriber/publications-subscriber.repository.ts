import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/lib/core';

import { PublicationsSubscriberEntity } from './publications-subscriber.entity';
import { PublicationsSubscriberModel } from './publications-subscriber.model';

export class PublicationsSubscriberRepository extends BaseMongoRepository<
PublicationsSubscriberEntity,
PublicationsSubscriberModel
> {
  constructor(
    @InjectModel(PublicationsSubscriberModel.name) publicationsSubscriberModel: Model<PublicationsSubscriberModel>
  ) {
    super(publicationsSubscriberModel, PublicationsSubscriberEntity.fromObject);
  }

  public async findEmail(email: string) {
    const document = await this.model.findOne({email}).exec();

    return this.createEntityFromDocument(document);
  }
}
