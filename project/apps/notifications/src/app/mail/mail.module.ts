import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '@project/lib/shared/helpers';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('notificationsMail'))
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
