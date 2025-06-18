import 'multer';

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { UploadCatalog } from '@project/lib/shared/app/types';

import {
  FORMAT_ERROR,
  ImageFormat,
  PARAM_TYPE_CUSTOM_ERROR,
  ParamType
} from './pipes.constant';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(file: Record<UploadCatalog, Express.Multer.File[]>, metadata: ArgumentMetadata) {
    if(metadata.type !== ParamType.Custom) {
      throw new Error(PARAM_TYPE_CUSTOM_ERROR);
    }

    Object.values(file).forEach(([value]) => {
      if(!(Object.values(ImageFormat) as string[]).includes(value.mimetype)) {
        throw new Error(FORMAT_ERROR);
      }
    })

    return file;
  }

}
