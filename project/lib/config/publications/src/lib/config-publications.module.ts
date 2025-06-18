import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './publications.constant';
import appConfig from './app/publications-app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigPublicationsModule {}
