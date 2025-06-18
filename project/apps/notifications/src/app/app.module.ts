import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ConfigNotificationsModule } from '@project/lib/config/notifications';
import { getMongooseOptions } from '@project/lib/shared/helpers';

import { PublicationsSubscriberModule } from './publications-subscriber/publications-subscriber.module';

@Module({
  imports: [
    ConfigNotificationsModule,
    PublicationsSubscriberModule,
    MongooseModule.forRootAsync(getMongooseOptions('notificationsMongo'))
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
