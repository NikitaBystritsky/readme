import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { fillDto } from '@project/lib/shared/helpers';
import { UploadCatalog } from '@project/lib/shared/app/types';
import { FileSizeValidationPipe, FileTypeValidationPipe, MongoIdValidationPipe } from '@project/lib/core';

import { FilesRDO } from './rdo/files.rdo';
import { FilesUploaderService } from './files-uploader.service';
import {
  FILE_UPLOADED_RESPONSE,
  MAX_UPLOAD_FILES,
  NOT_FOUND_BY_ID_RESPONSE,
  Route,
  ROUTE_PREFIX,
  TAG
} from './files-uploader.constant';
import { UploadFile } from './files-uploader.interface';

@ApiTags(TAG)
@Controller(ROUTE_PREFIX)
export class FilesUploaderController {
  constructor(private readonly filesUploaderService: FilesUploaderService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: FILE_UPLOADED_RESPONSE
  })
  @Post(Route.Upload)
  @UseInterceptors(FileFieldsInterceptor([
    { name: UploadCatalog.Avatar, maxCount: MAX_UPLOAD_FILES},
    { name: UploadCatalog.Photo, maxCount: MAX_UPLOAD_FILES },
  ]))
  public async save(@UploadedFiles(FileSizeValidationPipe, FileTypeValidationPipe) file: UploadFile) {
    const recordedFile = await this.filesUploaderService.saveFile(file);

    return fillDto(FilesRDO, recordedFile.toObject());
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: NOT_FOUND_BY_ID_RESPONSE
  })
  @Get(Route.FileParam)
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existFile = await this.filesUploaderService.getFile(id);

    return fillDto(FilesRDO, existFile.toObject());
  }
}
