import { Injectable } from '@nestjs/common';

import { CreatePostTagDTO } from './dto/create-post-tags.dto';
import { UpdatePostTagDTO } from './dto/update-post-tags.dto';
import { PostTagsEntity } from './post-tags.entity';
import { PostTagsRepository } from './post-tags.repository';

@Injectable()
export class PostTagService {
  constructor(
    private readonly postTagsRepository: PostTagsRepository
  ) {}

  public async getTagsById(id: string): Promise<PostTagsEntity> {
    return this.postTagsRepository.findById(id);
  }

  public async createTags(dto: CreatePostTagDTO) {
    const newTags = PostTagsEntity.fromDto(dto);

    return this.postTagsRepository.save(newTags);
  }

  public async updateTags(id: string, dto: UpdatePostTagDTO) {
    const existTags = await this.postTagsRepository.findById(id);

    if (dto.tags) {
      existTags.tags = PostTagsEntity.toUniqueArray(dto.tags);

      return this.postTagsRepository.update(id, existTags);
    }

    return existTags;
  }
}
