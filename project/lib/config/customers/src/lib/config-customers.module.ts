import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './customers.constant';
import { CustomersAppConfig } from './app/customers-app.config';
import { CustomersMongoConfig } from './mongo/customers-mongo.config';
import { CustomersJwtConfig } from './jwt/customers-jwt.config';
import { CustomersRabbitConfig } from './rabbit/customers-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        CustomersAppConfig,
        CustomersMongoConfig,
        CustomersJwtConfig,
        CustomersRabbitConfig
      ],
      envFilePath: ENV_FILE_PATH
    })
  ],
  providers: [],
  exports: []
})
export class ConfigCustomersModule {}
