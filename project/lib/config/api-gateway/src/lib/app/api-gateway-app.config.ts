import { registerAs } from '@nestjs/config';

import * as Joi from 'joi';

import { ApiGatewayConfig, Environment } from '@project/lib/shared/app/types';
import { createMessage } from '@project/lib/shared/helpers';

import { APP_DEFAULT_PORT, APP_VALIDATE_ERROR_MESSAGE } from './api-gateway-app.constant';

const appSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().port().required(),
  host: Joi.string().required(),
  usersServiceURL: Joi.string().uri().required(),
  postsServiceURL: Joi.string().uri().required(),
  filesServiceURL: Joi.string().uri().required(),
  notificationsServiceURL: Joi.string().uri().required(),
  maxRedirects: Joi.number().required(),
  clientTimeout: Joi.number().required()
});

function validateAppConfig(config: ApiGatewayConfig): void {
  const { error } = appSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(createMessage(APP_VALIDATE_ERROR_MESSAGE, [error.message]));
  }
}

export function getAppConfig(): ApiGatewayConfig {
  const config: ApiGatewayConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || APP_DEFAULT_PORT,
    host: process.env.HOST,
    usersServiceURL: process.env.USERS_SERVICE_URL,
    postsServiceURL: process.env.POSTS_SERVICE_URL,
    filesServiceURL: process.env.FILES_SERVICE_URL,
    notificationsServiceURL: process.env.NOTIFICATIONS_SERVICE_URL,
    maxRedirects: parseInt(process.env.MAX_REDIRECTS, 10),
    clientTimeout: parseInt(process.env.CLIENT_TIMEOUT, 10)
  };
  validateAppConfig(config);

  return config;
}

export const ApiGatewayAppConfig = registerAs('apiGatewayApp', getAppConfig);
