import { Injectable } from '@nestjs/common';

import { CreatePhotoPostDTO } from './dto/create-photo-post.dto';
import { PhotoPostEntity } from './photo-post.entity';
import { PhotoPostRepository } from './photo-post.repository';
import { UpdatePhotoPostDTO } from './dto/update-photo-post.dto';

@Injectable()
export class PhotoPostService {
  constructor(
    private readonly photoPostRepository: PhotoPostRepository
  ) {}

  public async getPostContentById(id: string) {
    return this.photoPostRepository.findById(id);
  }

  public async createPostContent(dto: CreatePhotoPostDTO) {
    const newPhotoPost = new PhotoPostEntity(dto);

    return this.photoPostRepository.save(newPhotoPost);
  }

  public async updatePostContent(id: string, dto: UpdatePhotoPostDTO) {
    const existPhotoPost = await this.photoPostRepository.findById(id);

    if(!!dto.image && existPhotoPost.image !== dto.image) {
      existPhotoPost.image = dto.image;

      return this.photoPostRepository.update(id, existPhotoPost);
    }

    return existPhotoPost;
  }
}
