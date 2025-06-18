import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { DEFAULT_MONGO_PORT, ErrorMessage } from './customers-mongo.constant';
import { CustomersMongoConfig } from './customers-mongo-config.interface';
import { customersMongoValidationSchema } from './customers-mongo-validation.schema';

function validateMongoConfig(config: CustomersMongoConfig): void {
  const { error } = customersMongoValidationSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getMongoConfig(): CustomersMongoConfig {
  const config: CustomersMongoConfig = {
    name: process.env.MONGO_DB_NAME,
    host: process.env.MONGO_DB_HOST,
    username: process.env.MONGO_DB_USERNAME,
    userPassword: process.env.MONGO_DB_USER_PASSWORD,
    port: parseInt(process.env.MONGO_DB_PORT, 10) || DEFAULT_MONGO_PORT,
    authSource: process.env.MONGO_AUTH_SOURCE
  };
  validateMongoConfig(config);

  return config
}

export default registerAs('customersMongo', getMongoConfig);
