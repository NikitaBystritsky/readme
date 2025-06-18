import * as Joi from 'joi';

import { Environment } from './files-app-config.enum';

export const filesAppValidationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  port: Joi.number().required(),
  host: Joi.string().required(),
  uploadDirectory: Joi.string().required(),
})
