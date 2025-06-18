import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { Comment } from '@project/lib/shared/app/types';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../post/post.entity';
import { NOT_FOUND_BY_ID_MESSAGE } from './comment.constant';

@Injectable()
export class CommentRepository extends BasePostgresRepository<CommentEntity, Comment> {
  constructor(
    protected readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, CommentEntity.fromObject);
  }

  public async findById(id: CommentEntity['id']): Promise<CommentEntity> {
    const record = await this.prismaClient.comment.findFirst({
      where: {id}
    });

    if(!record) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async findByPostId(postId: PostEntity['id'], {count}): Promise<CommentEntity[]> {
    const records = await this.prismaClient.comment.findMany({
      where: {
        publicationId: postId
      },
      take: count
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const newRecord = await this.prismaClient.comment.create({
      data: {
        content: entity.content,
        userId: entity.userId,
        publicationId: entity.publicationId
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async deleteById(id: CommentEntity['id'], userId: string): Promise<void> {
    await this.prismaClient.comment.delete({
      where: {
        id,
        userId
      }
    });
  }
}
