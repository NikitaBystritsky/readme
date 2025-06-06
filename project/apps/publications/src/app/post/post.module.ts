import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';

import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { VideoPostModule } from '../video-post/video-post.module';
import { TextPostModule } from '../text-post/text-post.module';
import { QuotePostModule } from '../quote-post/quote-post.module';
import { PhotoPostModule } from '../photo-post/photo-post.module';
import { LinkPostModule } from '../link-post/link-post.module';
import { PostTagsModule } from '../post-tags/post-tags.module';

@Module({
  imports: [
    PrismaClientModule,
    VideoPostModule,
    TextPostModule,
    QuotePostModule,
    PhotoPostModule,
    LinkPostModule,
    PostTagsModule
  ],
  controllers: [PostController],
  providers: [PostRepository, PostService],
  exports: [PostService]
})
export class PostModule {}
