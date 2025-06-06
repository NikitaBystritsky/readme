import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { TextPost } from '@project/lib/shared/app/types';
import { BasePostgresRepository } from '@project/lib/core';
import { TextPostEntity } from './text-post.entity';
import { NOT_FOUND_BY_ID_MESSAGE } from './text-post.constant';

@Injectable()
export class TextPostRepository extends BasePostgresRepository<TextPostEntity, TextPost> {
  constructor(
    protected readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, TextPostEntity.fromObject);
  }

  public async findById(id: TextPostEntity['id']): Promise<TextPostEntity> {
    const record = await this.prismaClient.text.findFirst({
      where: {id}
    });

    if(!record) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return this.createEntityFromDocument(record);
  }

  public async save(entity: TextPostEntity): Promise<TextPostEntity> {
    const newRecord = await this.prismaClient.text.create({
      data: {
        title: entity.title,
        preview: entity.preview,
        content: entity.content
      }
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: TextPostEntity['id'], entity: TextPostEntity): Promise<TextPostEntity> {
    const record = await this.prismaClient.text.update({
      where: {id},
      data: {
        title: entity.title,
        preview: entity.preview,
        content: entity.content
      }
    });

    return this.createEntityFromDocument(record);
  }
}
