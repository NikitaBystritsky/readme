import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { DEFAULT_MONGO_PORT, ErrorMessage } from './files-mongo.constant';
import { FilesMongoConfig } from './files-mongo-config.interface';
import { filesMongoValidationSchema } from './files-mongo-validation.schema';

function validateMongoConfig(config: FilesMongoConfig): void {
  const { error } = filesMongoValidationSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getMongoConfig(): FilesMongoConfig {
  const config: FilesMongoConfig = {
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

export default registerAs('filesMongo', getMongoConfig);
