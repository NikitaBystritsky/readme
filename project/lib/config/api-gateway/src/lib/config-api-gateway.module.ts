import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from './api-gateway.constant';
import { ApiGatewayAppConfig } from './app/api-gateway-app.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [ApiGatewayAppConfig],
    envFilePath: ENV_FILE_PATH
  })],
  providers: [],
  exports: []
})
export class ConfigApiGatewayModule {}
