import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfigApiGatewayModule } from '@project/lib/config/api-gateway';

import { PublicationsController } from './publications.controller';
import { CustomersController } from './customers.controller';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CommentsController } from './comments.controller';
import { LikesController } from './likes.controller';
import { NotificationsController } from './notifications.controller';
import { NewsFeedController } from './news-feed.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
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
