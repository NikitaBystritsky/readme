import { Injectable } from '@nestjs/common';

import { CreateQuotePostDTO, UpdateQuotePostDTO } from '@project/lib/shared/app/dto';
import { QuotePostEntity } from './quote-post.entity';
import { QuotePostRepository } from './quote-post.repository';

@Injectable()
export class QuotePostService {
  constructor(
    private readonly quotePostRepository: QuotePostRepository
  ) {}

  public async getPostContentById(id: string) {
    return this.quotePostRepository.findById(id);
  }

  public async createPostContent(dto: CreateQuotePostDTO) {
    const newQuotePost = new QuotePostEntity(dto);

    return this.quotePostRepository.save(newQuotePost);
  }

  public async updatePostContent(id: string, dto: UpdateQuotePostDTO) {
    const existQuotePost = await this.quotePostRepository.findById(id);
    let isExistQuotePostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(!!value && existQuotePost[key] !== value) {
        existQuotePost[key] = value;
        isExistQuotePostUpdated = true;
      }
    }

    if(isExistQuotePostUpdated) {
      return this.quotePostRepository.update(id, existQuotePost);
    }

    return existQuotePost;
  }
}
