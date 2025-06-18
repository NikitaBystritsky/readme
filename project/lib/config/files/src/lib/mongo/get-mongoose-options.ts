import { ConfigService } from '@nestjs/config';

import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@project/lib/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async(config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          host: config.get<string>('filesMongo.host'),
          port: config.get<string>('filesMongo.port'),
          database: config.get<string>('filesMongo.name'),
          username: config.get<string>('filesMongo.username'),
          userPassword: config.get<string>('filesMongo.userPassword'),
          authSource: config.get<string>('filesMongo.authSource')
        })
      }
    },
    inject: [ConfigService]
  }
}
