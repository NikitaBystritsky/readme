/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { createSwagger } from '@project/lib/swagger';
import { createMessage } from '@project/lib/shared/helpers';

import { AppModule } from './app/app.module';
import { APP_RUN_MESSAGE, PREFIX } from './constant';
import { RequestIdInterceptor } from './app/interceptor/request-id.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = PREFIX;
  const configService = app.get(ConfigService);
  const port = configService.get<string>('apiGatewayApp.port');
  const hostname = configService.get<string>('apiGatewayApp.host');
  createSwagger(app);
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalInterceptors(new RequestIdInterceptor());

  await app.listen(port);
  Logger.log(createMessage(APP_RUN_MESSAGE, [hostname, port, globalPrefix]));
}

bootstrap();
