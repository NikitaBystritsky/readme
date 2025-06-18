import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsMongoId } from 'class-validator';

import { USER_IDS_PROPERTY } from './dto.constant';

export class GetUsersDTO {
  @ApiProperty({
    description: USER_IDS_PROPERTY.DESCRIPTION,
    example: USER_IDS_PROPERTY.EXAMPLE
  })
  @IsArray()
  @IsMongoId({ each: true })
  public userIds: string[];
}
