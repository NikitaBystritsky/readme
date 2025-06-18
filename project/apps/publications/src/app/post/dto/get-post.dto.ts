import { IsDate, IsEmail, IsNotEmpty } from 'class-validator'

export class GetPostDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsDate()
  @IsNotEmpty()
  public lastNotification?: Date;
}
