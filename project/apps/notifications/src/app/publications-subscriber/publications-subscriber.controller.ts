import { Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { Exchange, Queue, RabbitRouting, Route } from '@project/lib/shared/app/types';
import { CreatePublicationsSubscriberDTO } from '@project/lib/shared/app/dto';

import { PublicationsSubscriberService } from './publications-subscriber.service';
import { MailService } from '../mail/mail.service';
import {
  NEWS_FEED_MESSAGE,
  NOT_AUTHORIZED_RESPONSE,
  NOTIFICATION_ROUTE_PREFIX,
  NOTIFICATION_TAG
} from './publications-subscriber.constants';

@ApiTags(NOTIFICATION_TAG)
@Controller(NOTIFICATION_ROUTE_PREFIX)
export class PublicationsSubscriberController {
  constructor(
    private readonly publicationsSubscriberService: PublicationsSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: NEWS_FEED_MESSAGE
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: NOT_AUTHORIZED_RESPONSE
  })
  @HttpCode(HttpStatus.OK)
  @Post(Route.Root)
  public async sendLastPublications(@Query('email') email: string) {
    const lastPosts = await this.publicationsSubscriberService.getLastPublications({ email });
    this.mailService.sendNotifyNewPublication(email, lastPosts)
  }

  @RabbitSubscribe({
    exchange: Exchange.CustomersExchange,
    routingKey: RabbitRouting.AddSubscriber,
    queue: Queue.AddSubscriberQueue
  })
  public async addSubscriber(dto: CreatePublicationsSubscriberDTO) {
    await this.publicationsSubscriberService.saveSubscriber(dto);
  }
}
