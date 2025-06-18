import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './publications.constant';
import { PublicationsAppConfig } from './app/publications-app.config';
import { PublicationsRabbitConfig } from './rabbit/publications-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [PublicationsAppConfig, PublicationsRabbitConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigPublicationsModule {}
