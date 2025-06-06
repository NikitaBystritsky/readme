import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { QuotePostRepository } from './quote-post.repository';
import { QuotePostService } from './quote-post.service';

@Module({
  imports: [PrismaClientModule],
  providers: [QuotePostRepository, QuotePostService],
  exports: [QuotePostService]
})
export class QuotePostModule {}
