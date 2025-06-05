import { registerAs } from '@nestjs/config';Add commentMore actions

import { createMessage } from '@project/lib/shared/helpers';

import { DEFAULT_MONGO_PORT, ErrorMessage } from './mongo.constant';
import { MongoConfig } from './mongo-config.interface';
import { mongoValidationSchema } from './mongo-validation.schema';

function validateMongoConfig(config: MongoConfig): void {
  const { error } = mongoValidationSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getMongoConfig(): MongoConfig {
  const config: MongoConfig = {
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

export default registerAs('mongo', getMongoConfig);
