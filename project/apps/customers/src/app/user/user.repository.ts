import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/lib/core';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends BaseMemoryRepository<UserEntity> {
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const entities = Array.from(this.entities.values());
    const result = entities.find((entity) => entity.email === email);
    return Promise.resolve(result || null);
  }
}
