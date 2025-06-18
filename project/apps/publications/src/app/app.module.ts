import { Module } from '@nestjs/common';

import { ConfigPublicationsModule } from '@project/lib/config/publications';

import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    PostModule,
    CommentModule,
    LikeModule,
    ConfigPublicationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
