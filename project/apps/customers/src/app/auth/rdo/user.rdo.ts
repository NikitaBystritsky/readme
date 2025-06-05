import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'A unique user ID.',
    example: '667c673deb3171fbdaa4ce26'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Last name and first name of the user.',
    example: 'Глуханько Антон'
  })
  @Expose()
  public fullName: string;

  @ApiProperty({
    description: 'The user unique email address.',
    example: 'user@mail.ru'
  })
  @Expose()
  public email: string

  @ApiProperty({
    description: 'The user avatar path.',
    example: 'default-avatar.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'The user created date.',
    example: '2022-01-18T17:36:34.064Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Number of user posts.',
    example: '5'
  })
  @Expose()
  public postCount: number;

  @ApiProperty({
    description: 'Number of subscribers.',
    example: '1'
  })
  @Expose()
  public subscribeCount: number;
}
