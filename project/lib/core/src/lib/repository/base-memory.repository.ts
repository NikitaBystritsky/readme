import { randomUUID } from 'node:crypto';

import { Entity, EntityId } from './entity.interface';
import { Repository } from './repository.interface';
import { NOT_FOUND_MESSAGE } from './repository.constant';
import { createMessage } from '@project/lib/shared/helpers';

export abstract class BaseMemoryRepository<T extends Entity<EntityId>> implements Repository<T> {
  private readonly _entities: Map<T['id'], T> = new Map();

  public get entities() {
    return this._entities;
  }

  public async findById(id: T['id']): Promise<T | null> {
    return this.entities.get(id) || null;
  }

  public async save(entity: T): Promise<T> {
    entity.id = randomUUID();
    this.entities.set(entity.id, entity);
    return entity;
  }

  public async update(id: T['id'], entity: T): Promise<T> {
    const result = this.entities.has(id);

    if (!result) {
      throw new Error(createMessage(NOT_FOUND_MESSAGE, [id]));
    }
    this.entities.set(id, entity);
    return entity;
  }

  public async delete(id: T['id']): Promise<void> {
    this.entities.delete(id);
  }
}
