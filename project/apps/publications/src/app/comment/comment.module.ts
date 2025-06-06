import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/lib/publications/models';
import { CommentRepository } from './comment.repository';
import { PostModule } from '../post/post.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [PrismaClientModule, PostModule],
  providers: [CommentRepository, CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
