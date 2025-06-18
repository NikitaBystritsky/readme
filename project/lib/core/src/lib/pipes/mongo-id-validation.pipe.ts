import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';

import { Types } from 'mongoose';

import { BAD_MONGO_ID_ERROR, ParamType, PARAM_TYPE_PARAM_ERROR } from './pipes.constant';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== ParamType.Param) {
      throw new Error(PARAM_TYPE_PARAM_ERROR)
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGO_ID_ERROR);
    }

    return value;
  }
}
