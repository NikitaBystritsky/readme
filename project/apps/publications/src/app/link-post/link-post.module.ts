import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { LinkPostRepository } from './link-post.repository';
import { LinkPostService } from './link-post.service';

@Module({
  imports: [PrismaClientModule],
  providers: [LinkPostRepository, LinkPostService],
  exports: [LinkPostService]
})
export class LinkPostModule {}
