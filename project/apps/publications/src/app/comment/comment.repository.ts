import {Pagination} from './../../../../../lib/shared/app/types/src/lib/pagination.interface';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { Comment } from '@project/lib/shared/app/types';
import { CommentsQuery } from '@project/lib/shared/app/query';

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

  private async getCommentsCount(where: Prisma.CommentWhereInput): Promise<number> {
    return this.prismaClient.comment.count({ where });
  }

  private calculateCommentsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
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

  public async findByPostId(postId: PostEntity['id'], query: CommentsQuery): Promise<Pagination<CommentEntity>> {
    const skip = query?.page && query?.count ?
      (query.page - 1) * query.count :
      Prisma.skip;
    const take = query?.count;
    const where: Prisma.CommentWhereInput = { publicationId: postId };

    const [records, commentCount] = await Promise.all([
      this.prismaClient.comment.findMany({ where, take, skip }),
      this.getCommentsCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(structuredClone(record))),
      currentPage: query?.page,
      totalPages: this.calculateCommentsPage(commentCount, take),
      itemsPerPage: take,
      totalItems: commentCount,
    }
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
