import { ApiProperty } from '@nestjs/swagger';
import { UserIdProperty } from '../like.constant';

export class LikeDTO {
  @ApiProperty({
    description: UserIdProperty.DESCRIPTION,
    example: UserIdProperty.EXAMPLE
  })
  public userId: string;
}
