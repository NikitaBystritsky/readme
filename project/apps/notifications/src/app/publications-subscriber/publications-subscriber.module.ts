import { Module } from '@nestjs/common';

import { PublicationsSubscriberRepository } from './publications-subscriber.repository';
import { PublicationsSubscriberService } from './publications-subscriber.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationsSubscriberModel, PublicationsSubscriberSchema } from './publications-subscriber.model';
import { PublicationsSubscriberController } from './publications-subscriber.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/lib/shared/helpers';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PublicationsSubscriberModel.name,
        schema: PublicationsSubscriberSchema
      }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('notificationsRabbit'),
    ),
    MailModule
  ],
  controllers: [
    PublicationsSubscriberController
  ],
  providers: [
    PublicationsSubscriberRepository,
    PublicationsSubscriberService
  ]
})
export class PublicationsSubscriberModule {}
