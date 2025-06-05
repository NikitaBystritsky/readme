import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import { ExtendUser } from '@project/lib/shared/app/types';

import { Entity } from '@project/lib/core';

import { DEFAULT_AVATAR, SALT_ROUNDS } from './user.constant';

export class UserEntity implements ExtendUser, Entity<string> {
  public id?: string;
  public fullName: string;
  public email: string;
  public password: string;
  public createdAt?: Date;
  public avatar: string;
  public postCount: number;
  public subscribeCount: number;

  constructor(user: ExtendUser) {
    this.populate(user);
  }

  public toObject() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
      createdAt: this.createdAt
    }
  }

  static fromObject(user: ExtendUser) {
    return new UserEntity(user);
  }

  public populate(user: ExtendUser) {
    this.fullName = user.fullName;
    this.email = user.email;
    this.password = user.password;
    this.avatar = user.avatar || DEFAULT_AVATAR;
    this.createdAt = user.createdAt;
  }

  public async setPassword(password: string) {
    const salt = genSaltSync(SALT_ROUNDS);
    this.password = hashSync(password, salt);

    return this;
  }

  public async comparePassword(password: string) {
    return compareSync(password, this.password);
  }
}
