import { Transform } from 'class-transformer';

import { IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

import { PostType, SortType } from '@project/lib/shared/app/types';

import { DEFAULT_MAX_POST_COUNT, DEFAULT_PAGE_COUNT } from './query.constant';

export class PostQuery {
  @IsMongoId()
  @IsOptional()
  public user?: string;

  @IsEnum(PostType)
  @IsOptional()
  public postType?: PostType;

  @IsString()
  @IsOptional()
  public tag?: string;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public orderDate?: SortType = SortType.Desc;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public orderLikes?: SortType = SortType.Desc;

  @IsIn(Object.values(SortType))
  @IsOptional()
  public orderRating?: SortType = SortType.Desc;

  @Transform(({value}) => +value || DEFAULT_MAX_POST_COUNT)
  @IsNumber()
  @IsOptional()
  public count?: number = DEFAULT_MAX_POST_COUNT;

  @Transform(({value}) => +value || DEFAULT_PAGE_COUNT)
  @IsNumber()
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;
}
