import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { DEFAULT_PORT, DEFAULT_HOSTNAME, VALIDATE_ERROR_MESSAGE } from './publications-app.constant';
import { PublicationsAppConfig } from './publications-app-config.interface';
import { publicationsAppValidationSchema } from './publications-app-validation.schema';

function validateAppConfig(config: PublicationsAppConfig): void {
  const { error } = publicationsAppValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getAppConfig(): PublicationsAppConfig {
  const config: PublicationsAppConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    host: process.env.HOST || DEFAULT_HOSTNAME
  };
  validateAppConfig(config);

  return config;
}

export default registerAs('publicationsApp', getAppConfig);
