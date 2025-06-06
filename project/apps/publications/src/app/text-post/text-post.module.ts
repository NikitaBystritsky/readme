import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { TextPostRepository } from './text-post.repository';
import { TextPostService } from './text-post.service';

@Module({
  imports: [PrismaClientModule],
  providers: [TextPostRepository, TextPostService],
  exports: [TextPostService]
})
export class TextPostModule {}
