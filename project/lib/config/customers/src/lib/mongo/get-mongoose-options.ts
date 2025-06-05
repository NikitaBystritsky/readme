import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@project/lib/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async(config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          host: config.get<string>('mongo.host'),
          port: config.get<string>('mongo.port'),
          database: config.get<string>('mongo.name'),
          username: config.get<string>('mongo.username'),
          userPassword: config.get<string>('mongo.userPassword'),
          authSource: config.get<string>('mongo.authSource')
        })
      }
    },
    inject: [ConfigService]
  }
}
