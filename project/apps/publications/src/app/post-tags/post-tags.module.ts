import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { PostTagsRepository } from './post-tags.repository';
import { PostTagService } from './post-tags.service';

@Module({
  imports: [PrismaClientModule],
  providers: [PostTagsRepository, PostTagService],
  exports: [PostTagService]
})
export class PostTagsModule {}
