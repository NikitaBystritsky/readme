import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/lib/publications/models';
import { createMessage } from '@project/lib/shared/helpers';
import { BasePostgresRepository } from '@project/lib/core';
import { PhotoPost } from '@project/lib/shared/app/types';
import { PhotoPostEntity } from './photo-post.entity';
import { NOT_FOUND_BY_ID_MESSAGE } from './photo-post.constant';

@Injectable()
export class PhotoPostRepository extends BasePostgresRepository<PhotoPostEntity, PhotoPost> {
  constructor(
    protected readonly prismaClient: PrismaClientService
  ) {
    super(prismaClient, PhotoPostEntity.fromObject);
  }

  public async findById(id: PhotoPostEntity['id']): Promise<PhotoPostEntity> {
      const record = await this.prismaClient.photo.findFirst({
        where: {id}
      });

      if(!record) {
        throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
      }

      return this.createEntityFromDocument(record);
  }

  public async save(entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const newRecord = await this.prismaClient.photo.create({
      data: {image: entity.image}
    });
    entity.id = newRecord.id;

    return entity;
  }

  public async update(id: PhotoPostEntity['id'], entity: PhotoPostEntity): Promise<PhotoPostEntity> {
    const record = await this.prismaClient.photo.update({
      where: {id},
      data: {image: entity.image}
    });

    return this.createEntityFromDocument(record);
  }
}
