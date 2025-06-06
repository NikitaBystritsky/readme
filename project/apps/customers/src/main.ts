/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The «Readme» project.')
    .setDescription('Description of the API server')
    .setVersion('1.0')
    .build();
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document)
  const configService = app.get(ConfigService);
  const port = configService.get<string>('app.port');
  const hostname = configService.get<string>('app.host');

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://${hostname}:${port}/${globalPrefix}`);
}

bootstrap();
