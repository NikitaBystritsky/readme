import * as Joi from 'joi';

export const customersJwtValidationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
});
