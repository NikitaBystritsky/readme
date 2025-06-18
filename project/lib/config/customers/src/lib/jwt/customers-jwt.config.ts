import { registerAs } from '@nestjs/config';

import { createMessage } from '@project/lib/shared/helpers';

import { customersJwtValidationSchema } from './customers-jwt-validation.schema';
import { JWTConfig } from './customers-jwt.interface';
import { VALIDATE_ERROR_MESSAGE } from './customers-jwt.constant';

function validateJwtConfig(config: JWTConfig): void {
  const { error } = customersJwtValidationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(createMessage(VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

function getJwtConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
  };

  validateJwtConfig(config);
  return config;
}

export const CustomersJwtConfig = registerAs('customersJwt', getJwtConfig);
