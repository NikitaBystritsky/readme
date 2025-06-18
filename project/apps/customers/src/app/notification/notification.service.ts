import { Injectable } from '@nestjs/common';

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { CreateSubscriberDTO } from '@project/lib/shared/app/dto';
import { Exchange, RabbitRouting } from '@project/lib/shared/app/types';

@Injectable()
export class NotificationService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDTO) {
    return this.rabbitClient.publish<CreateSubscriberDTO>(
      Exchange.CustomersExchange,
      RabbitRouting.AddSubscriber,
      dto
    )
  };
}
