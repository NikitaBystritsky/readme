import * as Joi from 'joi';

import { Environment } from './publications-app-config.enum';

export const publicationsAppValidationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().port().required(),
  host: Joi.string().required()
});
