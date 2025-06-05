import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Last name and first name of the user.',
    example: 'Глуханько Антон'
  })
  public fullName: string;

  @ApiProperty({
    description: 'The user unique email address.',
    example: 'user@mail.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'The user password.',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'The user avatar path.',
    example: 'default-avatar.png'
  })
  public avatar?: string;
}
