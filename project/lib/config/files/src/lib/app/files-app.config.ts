import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { AppConfig } from './files-app-config.interface';
import { DEFAULT_HOSTNAME, DEFAULT_PORT, VALIDATE_ERROR_MESSAGE } from './files-app.constant';
import { filesAppValidationSchema } from './files-app-validation.schema';

function validationAppConfig(config: AppConfig): void {
  const { error } = filesAppValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getAppConfig(): AppConfig {
  const config: AppConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    host: process.env.HOST || DEFAULT_HOSTNAME,
    uploadDirectory: process.env.UPLOAD_DIRECTORY
  }
  validationAppConfig(config);

  return config;
}

export const FilesAppConfig = registerAs('filesApp', getAppConfig);
