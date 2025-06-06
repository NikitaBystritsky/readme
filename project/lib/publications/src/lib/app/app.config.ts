import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { DEFAULT_PORT, HOSTNAME, VALIDATE_ERROR_MESSAGE } from './app.constant';
import { AppConfig } from './app-config.interface';
import { appValidationSchema } from './app-validation.schema';

function validateConfig(config: AppConfig): void {
  const { error } = appValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getConfig(): AppConfig {
  const config: AppConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    host: process.env.HOST || HOSTNAME
  };
  validateConfig(config);

  return config;
}

export default registerAs('app', getConfig);
