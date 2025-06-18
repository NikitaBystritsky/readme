import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { ConfigApiGatewayModule } from '@project/lib/config/api-gateway';

import { PublicationsController } from './publications/publications.controller';
import { CustomersController } from './customers/customers.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CommentsController } from './comments/comments.controller';
import { LikesController } from './likes/likes.controller';
import { NotificationsController } from './notifications/notifications.controller';
import { NewsFeedController } from './news-feed/news-feed.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get<number>('apiGatewayApp.clientTimeout'),
        maxRedirects: configService.get<number>('apiGatewayApp.maxRedirects'),
      }),
      inject: [ConfigService]
    }),
    ConfigApiGatewayModule
  ],
  controllers: [
    PublicationsController,
    CustomersController,
    CommentsController,
    LikesController,
    NotificationsController,
    NewsFeedController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
