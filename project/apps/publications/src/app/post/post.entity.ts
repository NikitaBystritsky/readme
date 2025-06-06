import { Entity } from '@project/lib/core';
import { Post, PostStatus, PostType } from '@project/lib/shared/app/types';
import { LinkPostEntity } from '../link-post/link-post.entity';
import { PhotoPostEntity } from '../photo-post/photo-post.entity';
import { QuotePostEntity } from '../quote-post/quote-post.entity';
import { VideoPostEntity } from '../video-post/video-post.entity';
import { TextPostEntity } from '../text-post/text-post.entity';
import { PostTagsEntity } from '../post-tags/post-tags.entity';

export class PostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public type: `${PostType}`;
  public status: `${PostStatus}`;
  public userId: string;
  public createdAt?: Date;
  public publishedDate?: Date;
  public repost?: boolean;
  public originalUserId?: string;
  public originalPublicationId?: string;
  public link?: LinkPostEntity;
  public photo?: PhotoPostEntity;
  public quote?: QuotePostEntity;
  public video?: VideoPostEntity;
  public text?: TextPostEntity;
  public tags?: PostTagsEntity;
  public likeCount: number;
  public commentCount: number;

  constructor(post: Post) {
    this.populate(post);
  }

  public toObject() {
    return {
      id: this.id,
      type: this.type,
      status: this.status,
      publishedDate: this.publishedDate,
      repost: this.repost,
      userId: this.userId,
      originalUserId: this.originalUserId,
      originalPublicationId: this.originalPublicationId,
      link: this.link && this.link.toObject(),
      photo: this.photo && this.photo.toObject(),
      quote: this.quote && this.quote.toObject(),
      video: this.video && this.video.toObject(),
      text: this.text && this.text.toObject(),
      tags: this.tags && this.tags.toObject(),
      commentCount: this.commentCount,
      likeCount: this.likeCount
    }
  }

  static fromObject(post: Post) {
    return new PostEntity(post);
  }

  public populate(post: Post) {
    this.id = post.id;
    this.type = post.type;
    this.status = post.status;
    this.createdAt = post.createdAt;
    this.publishedDate = post.publishedDate;
    this.repost = post.repost;
    this.userId = post.userId;
    this.originalUserId = post.originalUserId;
    this.originalPublicationId = post.originalPublicationId;
    this.link = post.link ? LinkPostEntity.fromObject(post.link) : undefined;
    this.photo = post.photo ? PhotoPostEntity.fromObject(post.photo) : undefined;
    this.quote = post.quote ? QuotePostEntity.fromObject(post.quote) : undefined;
    this.video = post.video ? VideoPostEntity.fromObject(post.video) : undefined;
    this.text = post.text ? TextPostEntity.fromObject(post.text) : undefined;
    this.tags = post.tags ? PostTagsEntity.fromObject(post.tags) : undefined;
    this.commentCount = post.commentCount;
    this.likeCount = post.likeCount;
  }
}
