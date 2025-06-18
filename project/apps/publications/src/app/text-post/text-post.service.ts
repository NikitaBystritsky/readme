import { Injectable } from '@nestjs/common';

import { CreateTextPostDTO, UpdateTextPostDTO } from '@project/lib/shared/app/dto';
import { TextPostEntity } from './text-post.entity';
import { TextPostRepository } from './text-post.repository';

@Injectable()
export class TextPostService {
  constructor(
    private readonly textPostRepository: TextPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return this.textPostRepository.findById(id);
  }

  public async createPostContent(dto: CreateTextPostDTO) {
    const newTextPost = new TextPostEntity(dto);

    return this.textPostRepository.save(newTextPost);
  }

  public async updatePostContent(id: string, dto: UpdateTextPostDTO) {
    const existTextPost = await this.textPostRepository.findById(id);
    let isExistTextPostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(!!value && existTextPost[key] !== value) {
        existTextPost[key] = value;
        isExistTextPostUpdated = true;
      }
    }

    if(isExistTextPostUpdated) {
      return this.textPostRepository.update(id, existTextPost);
    }

    return existTextPost;
  }
}
