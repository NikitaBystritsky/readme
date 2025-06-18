import { Transform } from 'class-transformer';

import { IsNumber, IsOptional } from 'class-validator';

import { DEFAULT_MAX_COMMENTS_COUNT, DEFAULT_PAGE_COUNT } from './query.constant';

export class CommentsQuery {
  @Transform(({value}) => +value || DEFAULT_MAX_COMMENTS_COUNT)
  @IsNumber()
  @IsOptional()
  public count?: number = DEFAULT_MAX_COMMENTS_COUNT;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;
}
