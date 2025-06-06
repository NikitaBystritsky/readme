import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { VideoPostRepository } from './video-post.repository';
import { VideoPostService } from './video-post.service';

@Module({
  imports: [PrismaClientModule],
  providers: [VideoPostRepository, VideoPostService],
  exports: [VideoPostService]
})
export class VideoPostModule {}
