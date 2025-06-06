import { Injectable } from '@nestjs/common';

import { CreateLinkPostDTO } from './dto/create-link-post.dto';
import { LinkPostEntity } from './link-post.entity';
import { LinkPostRepository } from './link-post.repository';
import { UpdateLinkPostDTO } from './dto/update-link-post.dto';

@Injectable()
export class LinkPostService {
  constructor(
    private readonly linkPostRepository: LinkPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return this.linkPostRepository.findById(id);
  }

  public async createPostContent(dto: CreateLinkPostDTO) {
    const newLinkPost = new LinkPostEntity(dto);

    return this.linkPostRepository.save(newLinkPost);
  }

  public async updatePostContent(id: string, dto: UpdateLinkPostDTO) {
    const existLinkPost = await this.linkPostRepository.findById(id);
    let isExistLinkPostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(!!value && existLinkPost[key] !== value) {
        existLinkPost[key] = value;
        isExistLinkPostUpdated = true;
      }
    }

    if(isExistLinkPostUpdated) {
      return this.linkPostRepository.update(id, existLinkPost);
    }

    return existLinkPost;
  }
}
