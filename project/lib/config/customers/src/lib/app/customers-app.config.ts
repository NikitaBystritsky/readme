import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { DEFAULT_PORT, DEFAULT_HOSTNAME, VALIDATE_ERROR_MESSAGE } from './customers-app.constant';
import { CustomersAppConfig } from './customers-app-config.interface';
import { customersAppValidationSchema } from './customers-app-validation.schema';

function validateAppConfig(config: CustomersAppConfig): void {
  const { error } = customersAppValidationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getAppConfig(): CustomersAppConfig {
  const config: CustomersAppConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    host: process.env.HOST || DEFAULT_HOSTNAME
  };
  validateAppConfig(config);

  return config;
}

export default registerAs('customersApp', getAppConfig);
