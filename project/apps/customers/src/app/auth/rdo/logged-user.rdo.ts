import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'A unique user ID.',
    example: '667c673deb3171fbdaa4ce26'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The user unique email address.',
    example: 'user@mail.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'The user access token.',
    example: 'T2VyLm5lckBnbWFpbC5jb20'
  })
  @Expose()
  public accessToken: string;
}
