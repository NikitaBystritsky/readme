import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { ENV_FILE_PATH } from './config-file.constant';
import filesAppConfig from './app/files-app.config';
import filesMongoConfig from './mongo/files-mongo.config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [filesAppConfig, filesMongoConfig],
      envFilePath: ENV_FILE_PATH
    })
  ],
})
export class FilesConfigModule {}
