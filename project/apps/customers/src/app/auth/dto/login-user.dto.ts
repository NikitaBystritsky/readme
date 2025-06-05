import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
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
}
