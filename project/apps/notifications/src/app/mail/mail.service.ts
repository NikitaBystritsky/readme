import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';

import { NotificationsMailConfig } from '@project/lib/config/notifications';
import { Post } from '@project/lib/shared/app/types';


import { EMAIL_PUBLICATION_SUBJECT, TEMPLATE_PATH } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  @Inject(NotificationsMailConfig.KEY)
  private readonly notificationsMailConfig: ConfigType<typeof NotificationsMailConfig>

  public async sendNotifyNewPublication(email: string, posts: Post[]) {
    await this.mailerService.sendMail({
      from: this.notificationsMailConfig.from,
      to: email,
      subject: EMAIL_PUBLICATION_SUBJECT,
      template: TEMPLATE_PATH,
      context: {
        posts
      }
    })
  }
}
