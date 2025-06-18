import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { ENV_FILE_PATH } from './config-file.constant';
import { FilesAppConfig } from './app/files-app.config';
import { FilesMongoConfig } from './mongo/files-mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [FilesAppConfig, FilesMongoConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
})
export class FilesConfigModule {}
