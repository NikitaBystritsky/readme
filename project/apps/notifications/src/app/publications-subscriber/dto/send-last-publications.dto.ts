import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendLastPublicationsDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}
