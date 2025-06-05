import * as Joi from 'joi';

import { DEFAULT_PORT } from './app.constant';
import { Environment } from './app-config.enum';

export const appValidationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().port().default(DEFAULT_PORT)
});
