import * as Joi from 'joi';

import { ConfigService } from '@nestjs/config';

import { RabbitConfig } from '@project/lib/shared/app/types';
import { createMessage } from '@project/lib/shared/helpers';

import { getRabbitMQConnectionString } from './common.helpers';
import {
  RABBITMQ_DEFAULT_PORT,
  RABBITMQ_VALIDATE_ERROR_MESSAGE,
  TYPE_EXCHANGE
} from './helpers.constant';

const rabbitWQSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  port: Joi.number().port().required(),
  user: Joi.string().required(),
  exchange: Joi.string().required(),
  type: Joi.string().required()
})

function validateConfig(config: RabbitConfig): void {
  const { error } = rabbitWQSchema.validate(config, { abortEarly: true });

  if(error) {
    throw new Error(createMessage(RABBITMQ_VALIDATE_ERROR_MESSAGE, [error]))
  }
}

export function getRabbitMQConfig(): RabbitConfig {
  const config: RabbitConfig = {
    host: process.env.RABBITMQ_HOST,
    password: process.env.RABBITMQ_PASSWORD,
    port: parseInt(process.env.RABBITMQ_PORT, 10) || RABBITMQ_DEFAULT_PORT,
    user: process.env.RABBITMQ_USER,
    exchange: process.env.RABBITMQ_EXCHANGE,
    type: process.env.RABBITMQ_EXCHANGE_TYPE || TYPE_EXCHANGE
  }
  validateConfig(config);

  return config;
}

export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async(config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.exchange`),
          type: config.get<string>(`${optionSpace}.type`)
        }
      ],
      uri: getRabbitMQConnectionString({
        host: config.get<string>(`${optionSpace}.host`),
        password: config.get<string>(`${optionSpace}.password`),
        user: config.get<string>(`${optionSpace}.user`),
        port: config.get<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true
    }),
    inject: [ConfigService]
  };
}
