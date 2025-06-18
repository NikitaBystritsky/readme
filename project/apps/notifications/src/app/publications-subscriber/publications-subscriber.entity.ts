import { Entity } from '@project/lib/core';
import { Subscriber } from '@project/lib/shared/app/types';

export class PublicationsSubscriberEntity implements Subscriber, Entity<string, Subscriber> {
  public id?: string;
  public email: string;
  public lastNotification: null | Date;

  constructor(data: Subscriber) {
    this.populate(data)
  }

  public populate(data: Subscriber) {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.lastNotification = data.lastNotification;

    return this;
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      lastNotification: this.lastNotification
    }
  }

  static fromObject(data: Subscriber) {
    return new PublicationsSubscriberEntity(data);
  }
}
