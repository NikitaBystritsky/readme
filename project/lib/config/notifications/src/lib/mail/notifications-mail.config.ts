import { createMessage, parseBoolean } from '@project/lib/shared/helpers';
import { notificationsMailValidationSchema } from './notifications-mail-validation.schema';
import { MailConfig } from './notifications-mail.interface';
import { DEFAULT_SMTP_PORT, VALIDATE_ERROR_MESSAGE } from './notifications-mail.constant';
import { registerAs } from '@nestjs/config';

function validationMailConfig(config: MailConfig): void {
  const { error } = notificationsMailValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error]))
  }
}

function getMailConfig(): MailConfig {
  const config: MailConfig = {
    host: process.env.MAIL_SMTP_HOST,
    port: parseInt(process.env.MAIL_SMTP_PORT, 10) || DEFAULT_SMTP_PORT,
    user: process.env.MAIL_USER_NAME,
    password: process.env.MAIL_USER_PASSWORD,
    from: process.env.MAIL_FROM,
    secure: parseBoolean(process.env.MAIL_SECURE)
  }

  validationMailConfig(config);

  return config;
 }

export const NotificationsMailConfig = registerAs('notificationsMail', getMailConfig);
