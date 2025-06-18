import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import {
  CATALOG_PROPERTY,
  CREATED_AT_PROPERTY,
  HASH_NAME_PROPERTY,
  ID_PROPERTY,
  MIMETYPE_PROPERTY,
  ORIGINAL_NAME_PROPERTY,
  PATH_NAME_PROPERTY,
  SIZE_PROPERTY,
  SUB_DIRECTORY_PROPERTY
} from './rdo.constant';

export class UploadedFileRDO {
  @ApiProperty({
    description: ID_PROPERTY.DESCRIPTION,
    example: ID_PROPERTY.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: ORIGINAL_NAME_PROPERTY.DESCRIPTION,
    example: ORIGINAL_NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    description: SUB_DIRECTORY_PROPERTY.DESCRIPTION,
    example: SUB_DIRECTORY_PROPERTY.EXAMPLE
  })
  @Expose()
  public subDirectory: string;

  @ApiProperty({
    description: CATALOG_PROPERTY.DESCRIPTION,
    example: CATALOG_PROPERTY.EXAMPLE
  })
  @Expose()
  public catalog: string;

  @ApiProperty({
    description: SIZE_PROPERTY.DESCRIPTION,
    example: SIZE_PROPERTY.EXAMPLE
  })
  @Expose()
  public size: number;

  @ApiProperty({
    description: MIMETYPE_PROPERTY.DESCRIPTION,
    example: MIMETYPE_PROPERTY.EXAMPLE
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    description: HASH_NAME_PROPERTY.DESCRIPTION,
    example: HASH_NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    description: PATH_NAME_PROPERTY.DESCRIPTION,
    example: PATH_NAME_PROPERTY.EXAMPLE
  })
  @Expose()
  public path: string;

  @ApiProperty({
    description: CREATED_AT_PROPERTY.DESCRIPTION,
    example: CREATED_AT_PROPERTY.EXAMPLE
  })
  @Expose()
  public createdAt: Date;
}
