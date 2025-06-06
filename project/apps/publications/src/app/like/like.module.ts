import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PrismaClientModule, PostModule],
  providers: [LikeRepository, LikeService],
  controllers: [LikeController]
})
export class LikeModule {}
