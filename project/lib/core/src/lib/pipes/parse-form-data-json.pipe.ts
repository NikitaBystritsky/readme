import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { PARSE_DATA_ERROR } from './pipes.constant';

@Injectable()
export class ParseFormDataJsonPipe implements PipeTransform {
  transform(value: { data?: string }, { type }: ArgumentMetadata) {
    if (type === 'body') {
      try {
        if (value.data && typeof value.data === 'string') {
          const parsedData = JSON.parse(value.data);
          delete value.data
          return { ...value, ...parsedData };
        }
        return value;
      } catch (error) {
        throw new BadRequestException(PARSE_DATA_ERROR);
      }
    }
    return value;
  }
}
