import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/lib/core';
import { createMessage } from '@project/lib/shared/helpers';
import { PrismaClientService } from '@project/lib/publications/models';
import { Post, PostStatus } from '@project/lib/shared/app/types';
import { PostEntity } from './post.entity';
import { NOT_FOUND_BY_ID_MESSAGE } from './post.constant';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    protected readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, PostEntity.fromObject)
  }

  public async findById(id: PostEntity['id']): Promise<PostEntity> {
    const record = await this.prismaClient.publication.findFirst({
      where: {
        id
      },
      include: {
        comments: {
          select: {
            id: true
          }
        },
        likes: {
          select: {
            id: true
          }
        },
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tags: true
      }
    })

    if(!record) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(Object.assign({
      tags: record.tags,
      commentCount: record.comments.length,
      likeCount: record.likes.length
    }, record));
  }

  public async findByDraftStatus({sort, count}) {
    const records = await this.prismaClient.publication.findMany({
      where: {
        status: PostStatus.Draft
      },
      take: count,
      include: {
        comments: {
          select: {
            id: true
          }
        },
        likes: {
          select: {
            id: true
          }
        },
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tags: true
      },
      orderBy: {
        publishedDate: sort
      }
    });

    return records.map((record) => this.createEntityFromDocument(Object.assign({
      tags: record.tags,
      commentCount: record.comments.length,
      likeCount: record.likes.length
    }, record)));
  }

  public async find({type, tagName, userId, sort, count}): Promise<PostEntity[]> {
    const records = await this.prismaClient.publication.findMany({
      where: {
        userId: userId ?? Prisma.skip,
        type: type ?? Prisma.skip,
        status: PostStatus.Published,
        tags: !tagName ? Prisma.skip : {
          tags: {
            hasEvery: [`#${tagName}`]
          }
        }
      },
      take: count,
      include: {
        comments: {
          select: {
            id: true
          }
        },
        likes: {
          select: {
            id: true
          }
        },
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tags: true
      },
      orderBy: {
        publishedDate: sort
      }
    });

    return records.map((record) => this.createEntityFromDocument(Object.assign({
      tags: record.tags,
      commentCount: record.comments.length,
      likeCount: record.likes.length
    }, record)));
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
    const newRecord = await this.prismaClient.publication.create({
      data: {
        type: entity.type,
        status: entity.status,
        userId: entity.userId,
        publishedDate: entity.publishedDate ?? Prisma.skip,
        repost: entity.repost ?? Prisma.skip,
        originalUserId: entity.originalUserId ?? Prisma.skip,
        originalPublicationId: entity.originalPublicationId ?? Prisma.skip,
        [entity.type]: {
          connect: {id: entity[entity.type].id}
        },
        tags: !entity.tags ? Prisma.skip : {
          connect: {id: entity.tags.id}
        }
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: PostEntity['id'], entity: PostEntity): Promise<PostEntity> {
    const record = await this.prismaClient.publication.update({
      where: {
        id
      },
      data: {
        status: entity.status,
        publishedDate: entity.publishedDate,
        tags: !entity.tags ? Prisma.skip : {
          connect: {id: entity.tags.id}
        }
      },
      include: {
        comments: {
          select: {
            id: true
          }
        },
        likes: {
          select: {
            id: true
          }
        },
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tags: true
      }
    });

    return this.createEntityFromDocument(record);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaClient.publication.delete({
      where: {
        id
      }
    })
  }
}
