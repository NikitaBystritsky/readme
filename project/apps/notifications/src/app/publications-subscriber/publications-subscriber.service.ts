import dayjs from 'dayjs';

import {Injectable} from '@nestjs/common';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/lib/shared/app/types';

import { PublicationsSubscriberEntity } from './publications-subscriber.entity';
import { PublicationsSubscriberRepository } from './publications-subscriber.repository';
import { CreatePublicationsSubscriberDTO } from './dto/create-publications-subscriber.dto';
import { PUBLICATIONS_SUBSCRIBE } from './publications-subscriber.constants';
import { SendLastPublicationsDTO } from './dto/send-last-publications.dto';

@Injectable()
export class PublicationsSubscriberService {
  constructor(
    private readonly publicationsSubscriberRepository: PublicationsSubscriberRepository,
    private readonly rabbitClient: AmqpConnection,
  ) {}

  public async saveSubscriber(dto: CreatePublicationsSubscriberDTO) {
    const existsSubscriber = await this.publicationsSubscriberRepository
      .findEmail(dto.email);

    if(existsSubscriber) {
      return existsSubscriber;
    }

    await this.publicationsSubscriberRepository
      .save(new PublicationsSubscriberEntity(dto));
  }

  public async getLastPublications(dto: SendLastPublicationsDTO) {
    const subscriber = await this.publicationsSubscriberRepository.findEmail(dto.email);

    await this.rabbitClient.publish(
      PUBLICATIONS_SUBSCRIBE.EXCHANGE,
      RabbitRouting.GetPublications,
      {email: dto.email, lastNotification: subscriber.lastNotification}
    );

    const entity = new PublicationsSubscriberEntity({
      email: dto.email,
      lastNotification: dayjs().toDate()
    });

    await this.publicationsSubscriberRepository.update(
      subscriber.id,
      entity
    );
  }
}


