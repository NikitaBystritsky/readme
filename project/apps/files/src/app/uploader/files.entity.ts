import { Entity } from '@project/lib/core';
import { File } from '@project/lib/shared/app/types';

export class FilesEntity implements File, Entity<string> {
  public id?: string;
  public originalName: string;
  public subDirectory: string;
  public catalog: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(file: File) {
    this.populate(file);
  }

  public toObject() {
    return {
      id: this.id,
      originalName: this.originalName,
      subDirectory: this.subDirectory,
      catalog: this.catalog,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

  static fromObject(file: File) {
    return new FilesEntity(file);
  }

  public populate(file: File) {
    this.id = file.id;
    this.originalName = file.originalName;
    this.subDirectory = file.subDirectory;
    this.catalog = file.catalog,
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;

    return this;
  }

}
