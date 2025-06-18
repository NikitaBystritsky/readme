import dayjs from 'dayjs';

import {Injectable} from '@nestjs/common';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { Exchange, Post, RabbitRouting } from '@project/lib/shared/app/types';

import { PublicationsSubscriberEntity } from './publications-subscriber.entity';
import { PublicationsSubscriberRepository } from './publications-subscriber.repository';
import { CreatePublicationsSubscriberDTO, SendLastPostsDTO } from '@project/lib/shared/app/dto';
import { REQUEST_TIMEOUT } from './publications-subscriber.constants';

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

  public async getLastPublications(dto: SendLastPostsDTO) {
    const subscriber = await this.publicationsSubscriberRepository.findEmail(dto.email);

    const lastPosts = this.rabbitClient.request<Post[]>({
      exchange: Exchange.NotificationsExchange,
      routingKey: RabbitRouting.GetPublications,
      payload: { lastNotification: subscriber.lastNotification },
      timeout: REQUEST_TIMEOUT
    });

    const entity = new PublicationsSubscriberEntity({
      email: dto.email,
      lastNotification: dayjs().toDate()
    });

    await this.publicationsSubscriberRepository.update(
      subscriber.id,
      entity
    );

    return lastPosts;
  }
}


