export type EntityId = string;

export interface Entity<T extends EntityId> {
  id?: T;
  toObject(): Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
};
