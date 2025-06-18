import { Injectable, NotFoundException } from '@nestjs/common';

import { PostStatus, Prisma } from '@prisma/client';

import { BasePostgresRepository } from '@project/lib/core';
import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { Pagination, Post } from '@project/lib/shared/app/types';

import { PostEntity } from './post.entity';
import { MAX_POST_COUNT_SEARCH, NOT_FOUND_BY_ID_MESSAGE } from './post.constant';
import { PostQuery } from './query/post.query';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    protected readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, PostEntity.fromObject)
  }

  private async getPostCount(where: Prisma.PublicationWhereInput): Promise<number> {
    return this.prismaClient.publication.count({where});
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(query: PostQuery): Promise<Pagination<PostEntity>> {
    const skip = query?.page && query?.count ?
      (query.page - 1) * query.count :
      Prisma.skip;
    const take = query?.count;
    const orderBy: Prisma.PublicationOrderByWithRelationInput[] = [
      {
        publishedDate: query?.orderDate
      },
      {
        comments: {
          _count: query?.orderRating
        }
      },
      {
        likes: {
          _count: query?.orderLikes
        }
      }
    ];
    const where: Prisma.PublicationWhereInput = {
      userId: query?.orderUser ?? Prisma.skip,
      type: query?.orderType ?? Prisma.skip,
      status: PostStatus.published,
      tags: query?.orderTag ? {
        tags: {
          hasEvery: [query.orderTag]
        }
      } :
      Prisma.skip,
      createdAt: {
        gt: query?.orderDateCreate ?? Prisma.skip
      }
    };

    const [records, postCount] = await Promise.all([
      this.prismaClient.publication.findMany({where, take, orderBy, skip,
        include: {
          _count: {
            select: {
              comments: true,
              likes: true
            }
          },
          link: true,
          photo: true,
          quote: true,
          text: true,
          video: true,
          tags: true
        }
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(Object.assign({
        tags: record.tags,
        commentCount: record._count.comments,
        likeCount: record._count.likes
      }, record))),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }

  public async findById(id: PostEntity['id']): Promise<PostEntity> {
    const record = await this.prismaClient.publication.findFirst({
      where: {
        id
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true
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
      commentCount: record._count.comments,
      likeCount: record._count.likes
    }, record));
  }

  public async findByDraftStatus(userId: string) {
    const records = await this.prismaClient.publication.findMany({
      where: {
        userId,
        status: PostStatus.draft
      },
      include: {
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true,
        tags: true
      }
    });

    return records.map((record) => this.createEntityFromDocument(Object.assign({
      tags: record.tags,
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
        tags: entity.tags ? {
          connect: {id: entity.tags.id}
        } :
        Prisma.skip
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
        tags: !entity.tags ? {
          connect: {id: entity.tags.id}
        } :
        Prisma.skip
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

  public async delete(id: PostEntity['id']): Promise<void> {
    await this.prismaClient.publication.delete({
      where: {
        id
      }
    })
  }

  public async search(searchParams: string): Promise<PostEntity[]> {
    const records = await this.prismaClient.publication.findMany({
      where: {
        status: PostStatus.published,
        OR: [
          {
            video: {
              title: {
                contains: searchParams,
                mode: 'insensitive'
              }
            }
          },
          {
            text: {
              title: {
                contains: searchParams,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
      take: MAX_POST_COUNT_SEARCH,
      include: {
        video: true,
        text: true,
        tags: true
      }
    })

    return records.map((record) => this.createEntityFromDocument(Object.assign({
      tags: record.tags
    }, record)));
  }

  public async findLatestPosts(lastNotification?: Date): Promise<PostEntity[]> {
    const records = await this.prismaClient.publication.findMany({
      where: {
        createdAt: {
          gt: lastNotification ?? Prisma.skip
        }
      },
      include: {
        link: true,
        photo: true,
        quote: true,
        text: true,
        video: true
      }
    })

    return records.map((record) => this.createEntityFromDocument(structuredClone(record)))
  }
}
