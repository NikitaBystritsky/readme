import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './config-notifications.constant';
import { NotificationsMongoConfig } from './mongo/notifications-mongo.config';
import { NotificationsRabbitConfig } from './rabbit/notifications-rabbit.config';
import { NotificationsAppConfig } from './app/notifications-app.config';
import { NotificationsMailConfig } from './mail/notifications-mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        NotificationsMongoConfig,
        NotificationsRabbitConfig,
        NotificationsAppConfig,
        NotificationsMailConfig
      ],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class ConfigNotificationsModule {}
