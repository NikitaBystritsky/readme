import { ConfigService } from '@nestjs/config';

import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@project/lib/shared/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async(config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          host: config.get<string>('customersMongo.host'),
          port: config.get<string>('customersMongo.port'),
          database: config.get<string>('customersMongo.name'),
          username: config.get<string>('customersMongo.username'),
          userPassword: config.get<string>('customersMongo.userPassword'),
          authSource: config.get<string>('customersMongo.authSource')
        })
      }
    },
    inject: [ConfigService]
  }
}
