import { IsDate, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreatePublicationsSubscriberDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
  @IsDate()
  @ValidateIf((_, value) => value !== null)
  public lastNotification: null | Date;
 }
