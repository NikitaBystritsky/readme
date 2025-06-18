import * as Joi from 'joi';

import { Environment } from './customers-app-config.enum';

export const customersAppValidationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().port().required(),
  host: Joi.string().required()
});
