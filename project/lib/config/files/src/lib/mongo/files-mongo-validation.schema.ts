import * as Joi from 'joi';

export const filesMongoValidationSchema = Joi.object({
  name: Joi.string().required(),
  host: Joi.string().hostname().required(),
  username: Joi.string().required(),
  userPassword: Joi.string().required(),
  port: Joi.number().port().required(),
  authSource: Joi.string().required()
});
