import 'multer';

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import {
  ParamType,
  PARAM_TYPE_CUSTOM_ERROR,
  MAX_SIZE_AVATAR,
  MAX_SIZE_PHOTO,
  AVATAR_SIZE_ERROR,
  PHOTO_SIZE_ERROR
} from './pipes.constant';
import { UploadCatalog } from '@project/lib/shared/app/types';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: Record<UploadCatalog, Express.Multer.File[]>, metadata: ArgumentMetadata) {
    if (metadata.type !== ParamType.Custom) {
      throw new Error(PARAM_TYPE_CUSTOM_ERROR)
    }

    Object.values(file).forEach(([value]) => {

      if (value.fieldname === UploadCatalog.Avatar && value.size > MAX_SIZE_AVATAR) {
        throw new Error(AVATAR_SIZE_ERROR)
      }

      if (value.fieldname === UploadCatalog.Photo && value.size > MAX_SIZE_PHOTO) {
        throw new Error(PHOTO_SIZE_ERROR)
      }
    })

    return file;
  }
}
