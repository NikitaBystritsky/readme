import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { PostTags } from '@project/lib/shared/app/types';
import { PostTagsEntity } from './post-tags.entity';
import { NOT_FOUND_BY_ID_MESSAGE } from './post-tags.constant';

@Injectable()
export class PostTagsRepository extends BasePostgresRepository<PostTagsEntity, PostTags> {
  constructor(
    protected readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, PostTagsEntity.fromObject);
  }

  public async findById(id: PostTagsEntity['id']): Promise<PostTagsEntity> {
    const record = await this.prismaClient.tag.findFirst({
      where: {id}
    });

    if(!record) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async save(entity: PostTagsEntity): Promise<PostTagsEntity> {
    const newRecord = await this.prismaClient.tag.create({
      data: {tags: entity.tags}
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: PostTagsEntity['id'], entity: PostTagsEntity): Promise<PostTagsEntity> {
    const record = await this.prismaClient.tag.update({
      where: {id},
      data: {tags: entity.tags}
    });

    return this.createEntityFromDocument(record);
  }
}
