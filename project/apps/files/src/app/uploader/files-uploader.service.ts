import 'multer';

import dayjs from 'dayjs';

import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ensureDir } from 'fs-extra';

import { extension } from 'mime-types';

import { filesAppConfig } from '@project/lib/config/files';
import { createMessage } from '@project/lib/shared/helpers';
import { StoredFile, UploadCatalog } from '@project/lib/shared/app/types';

import { FilesEntity } from './files.entity';
import { DATE_FORMAT, FILE_WRITE_ERROR, NOT_FOUND_BY_ID_MESSAGE } from './files-uploader.constant';
import { FilesUploaderRepository } from './files-uploader.repository';
import { UploadFile } from './files-uploader.interface';

@Injectable()
export class FilesUploaderService {
  private readonly logger = new Logger(FilesUploaderService.name);

  constructor(
    @Inject(filesAppConfig.KEY)
    public readonly config: ConfigType<typeof filesAppConfig>,
    public readonly filesUploaderRepository: FilesUploaderRepository
  ) {}

  public async writeFile(file: UploadFile, catalog: UploadCatalog): Promise<StoredFile> {
    try {
      const [year, month] = dayjs().format(DATE_FORMAT).split(' ');
      const fileExtension = extension(file[catalog][0].mimetype);
      const filename = `${randomUUID()}.${fileExtension}`;
      const subDirectory = join(catalog, year, month);
      const uploadDirectory = join(this.config.uploadDirectory, subDirectory);
      const path = join(uploadDirectory, filename);

      await ensureDir(uploadDirectory);
      await writeFile(path, file[catalog][0].buffer);

      return {
        fileExtension,
        filename,
        path,
        subDirectory,
        catalog
      };
    } catch (error) {
      this.logger.error(createMessage(FILE_WRITE_ERROR, [error.message]));
      throw new Error(createMessage(FILE_WRITE_ERROR, [error.message]));
    }
  }

  public async saveFile(file: UploadFile): Promise<FilesEntity> {
    const catalog = Object.keys(file)[0] as UploadCatalog;
    const recordedFile = await this.writeFile(file, catalog);
    const fileEntity = FilesEntity.fromObject({
      hashName: recordedFile.filename,
      mimetype: file[catalog][0].mimetype,
      originalName: file[catalog][0].originalname,
      path: recordedFile.path,
      size: file[catalog][0].size,
      subDirectory: recordedFile.subDirectory,
      catalog: recordedFile.catalog
    });

    return this.filesUploaderRepository.save(fileEntity);
  }

  public async getFile(id: string): Promise<FilesEntity> {
    const existFile = await this.filesUploaderRepository.findById(id);

    if(!existFile) {
      throw new NotFoundException(createMessage(NOT_FOUND_BY_ID_MESSAGE, [id]));
    }

    return existFile;
  }
}
