import * as Joi from 'joi';

import { DEFAULT_MONGO_PORT } from './mongo.constant';

export const mongoValidationSchema = Joi.object({
  name: Joi.string().required(),
  host: Joi.string().hostname().required(),
  username: Joi.string().required(),
  userPassword: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_MONGO_PORT),
  authSource: Joi.string().required()
});
