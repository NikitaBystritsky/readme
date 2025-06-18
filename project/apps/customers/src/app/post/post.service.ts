import { Injectable } from '@nestjs/common';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { SendPostCount } from '@project/lib/shared/app/dto';
import { Exchange, RabbitRouting } from '@project/lib/shared/app/types';

import { REQUEST_TIMEOUT } from './post.constant';

@Injectable()
export class PostService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
  ) {}

  public async getPostsCount(dto: SendPostCount) {
    return this.rabbitClient.request<number>({
      exchange: Exchange.PublicationsExchange,
      routingKey: RabbitRouting.GetPublicationsCount,
      payload: dto,
      timeout: REQUEST_TIMEOUT
    });
  };
}
