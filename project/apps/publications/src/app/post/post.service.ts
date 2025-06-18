import dayjs from 'dayjs';

import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { CreatePostDTO, UpdatePostDTO } from '@project/lib/shared/app/dto';
import { createMessage } from '@project/lib/shared/helpers';
import { PostType } from '@project/lib/shared/app/types';
import { PostQuery } from '@project/lib/shared/app/query';

import { LinkPostService } from '../link-post/link-post.service';
import { PostTagService } from '../post-tags/post-tags.service';
import { VideoPostService } from '../video-post/video-post.service';
import { PostRepository } from './post.repository';
import { TextPostService } from '../text-post/text-post.service';
import { QuotePostService } from '../quote-post/quote-post.service';
import { PhotoPostService } from '../photo-post/photo-post.service';
import { PostEntity } from './post.entity';
import { PostTagsEntity } from '../post-tags/post-tags.entity';
import { NOT_FOUND_BY_ID_MESSAGE, POST_REPOST_ERROR_MESSAGE, REPOST_ERROR_MESSAGE } from './post.constant';
import { PostContent } from './post.type';

@Injectable()
export class PostService {
  private readonly postContent: PostContent = {
    [PostType.Video]: this.videoPostService,
    [PostType.Link]: this.linkPostService,
    [PostType.Text]: this.textPostService,
    [PostType.Quote]: this.quotePostService,
    [PostType.Photo]: this.photoPostService
  }

  constructor(
    private readonly postTagsService: PostTagService,
    private readonly postRepository: PostRepository,
    private readonly videoPostService: VideoPostService,
    private readonly linkPostService: LinkPostService,
    private readonly textPostService: TextPostService,
    private readonly quotePostService: QuotePostService,
    private readonly photoPostService: PhotoPostService,
  ) {}

  public async createPost(dto: CreatePostDTO) {
    let tags: PostTagsEntity;

    if(dto.tags) {
      tags = await this.postTagsService.createTags({tags: dto.tags});
    }
    const newPostContent = await this.postContent[dto.type].createPostContent(dto);
    const post = {
      type: dto.type,
      status: dto.status,
      userId: dto.userId,
      [dto.type]: newPostContent,
      tags
    }
    const newPost = new PostEntity(post);

    return this.postRepository.save(newPost);
  }

  public async repostPost(id: string, userId: string) {
    const existsPost = await this.postRepository.findById(id);
    const repost = await this.postRepository.findByOriginalId(existsPost.id);

    if(repost) {
      throw new BadRequestException(POST_REPOST_ERROR_MESSAGE);
    }

    if(existsPost.repost) {
      throw new BadRequestException(REPOST_ERROR_MESSAGE);
    }

    const post = {
      type: existsPost.type,
      status: existsPost.status,
      userId,
      [existsPost.type]: existsPost[existsPost.type],
      tags: existsPost.tags,
      repost: true,
      publishedDate: dayjs().toDate(),
      originalUserId: existsPost.userId,
      originalPublicationId: existsPost.id
    }
    const newPost = new PostEntity(post);

    return this.postRepository.save(newPost);
  }

  public async getPostById(id: string) {
    return this.postRepository.findById(id);
  }

  public async getAllPosts(query?: PostQuery, ids?: string[]) {
    return this.postRepository.find(query, ids);
  }

  public async getPostsByDraftStatus(userId: string) {
    return this.postRepository.findByDraftStatus(userId);
  }

  public async updatePostById(id: string, dto: UpdatePostDTO) {
    const existsPost = await this.postRepository.findById(id);
    let isExistsPostUpdated = false;

    await this.postContent[existsPost.type].updatePostContent(existsPost[existsPost.type].id, dto);

    for (const [key, value] of Object.entries(dto)) {
      if (!value) {
        continue;
      }

      if (key === 'tags') {
        if (!existsPost.tags) {
          existsPost.tags = await this.postTagsService.createTags({ tags: dto.tags });
          isExistsPostUpdated = true;
        } else {
          existsPost.tags = await this.postTagsService.updateTags(existsPost.tags.id, { tags: dto.tags });
        }

        continue;
      }

      if (existsPost[key] !== value) {
        existsPost[key] = value;
        isExistsPostUpdated = true;

        continue;
      }
    }

    if (isExistsPostUpdated) {
      return this.postRepository.update(existsPost.id, existsPost);
    }

    return existsPost;
  }

  public async deletePostById(id: string) {
    try {
      await this.postRepository.delete(id);
    } catch {
      throw new ConflictException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }
  }

  public async searchPostByTittle(searchParams: string) {
    return this.postRepository.search(searchParams);
  }

  public async getLatestPosts(lastNotification?: Date) {
    return this.postRepository.findLatestPosts(lastNotification);
  }

  public async getUserPostsCount(id: string) {
    return this.postRepository.getUserPostsCount(id);
  }
}
