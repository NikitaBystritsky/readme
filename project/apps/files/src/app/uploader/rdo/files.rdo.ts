import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import {
  CatalogProperty,
  CreatedAtProperty,
  HashNameProperty,
  IdProperty,
  MimetypeProperty,
  OriginalNameProperty,
  PathNameProperty,
  SizeProperty,
  SubDirectoryProperty
} from '../files-uploader.constant';

export class FilesRDO {
  @ApiProperty({
    description: IdProperty.DESCRIPTION,
    example: IdProperty.EXAMPLE
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: OriginalNameProperty.DESCRIPTION,
    example: OriginalNameProperty.EXAMPLE
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    description: SubDirectoryProperty.DESCRIPTION,
    example: SubDirectoryProperty.EXAMPLE
  })
  @Expose()
  public subDirectory: string;

  @ApiProperty({
    description: CatalogProperty.DESCRIPTION,
    example: CatalogProperty.EXAMPLE
  })
  @Expose()
  public catalog: string;

  @ApiProperty({
    description: SizeProperty.DESCRIPTION,
    example: SizeProperty.EXAMPLE
  })
  @Expose()
  public size: number;

  @ApiProperty({
    description: MimetypeProperty.DESCRIPTION,
    example: MimetypeProperty.EXAMPLE
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    description: HashNameProperty.DESCRIPTION,
    example: HashNameProperty.EXAMPLE
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    description: PathNameProperty.DESCRIPTION,
    example: PathNameProperty.EXAMPLE
  })
  @Expose()
  public path: string;

  @ApiProperty({
    description: CreatedAtProperty.DESCRIPTION,
    example: CreatedAtProperty.EXAMPLE
  })
  @Expose()
  public createdAt: Date;
}
