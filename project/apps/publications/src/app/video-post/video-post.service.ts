import { Injectable } from '@nestjs/common';

import { CreateVideoPostDTO, UpdateVideoPostDTO } from '@project/lib/shared/app/dto';
import { VideoPostEntity } from './video-post.entity';
import { VideoPostRepository } from './video-post.repository';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly videoPostRepository: VideoPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return this.videoPostRepository.findById(id);
  }

  public async createPostContent(dto: CreateVideoPostDTO) {
    const newVideoPost = new VideoPostEntity(dto);

    return this.videoPostRepository.save(newVideoPost);
  }

  public async updatePostContent(id: string, dto: UpdateVideoPostDTO) {
    const existVideoPost = await this.videoPostRepository.findById(id);
    let isExistVideoPostUpdated = false;

    for(const [key, value] of Object.entries(dto)) {
      if(!!value && existVideoPost[key] !== value) {
        existVideoPost[key] = value;
        isExistVideoPostUpdated = true;
      }
    }

    if(isExistVideoPostUpdated) {
      return this.videoPostRepository.update(id, existVideoPost);
    }

    return existVideoPost;
  }
}
