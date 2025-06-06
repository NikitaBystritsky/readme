import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { PhotoPostRepository } from './photo-post.repository';
import { PhotoPostService } from './photo-post.service';

@Module({
  imports: [PrismaClientModule],
  providers: [PhotoPostRepository, PhotoPostService],
  exports: [PhotoPostService]
})
export class PhotoPostModule {}
