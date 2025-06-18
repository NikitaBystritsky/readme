export const BAD_MONGO_ID_ERROR = 'Bad entity ID';
export const PARAM_TYPE_PARAM_ERROR = 'This pipe must used only with params!';
export const PARAM_TYPE_CUSTOM_ERROR = 'This pipe must used only with customs!';
export const PHOTO_SIZE_ERROR = 'The maximum photo size should be 1 megabyte.';
export const AVATAR_SIZE_ERROR = 'The maximum avatar size should be 500 kilobytes.';
export const FORMAT_ERROR = 'The image format should be jpeg or png.';

export const MAX_SIZE_AVATAR = 500000;
export const MAX_SIZE_PHOTO = 1e+6;

export enum ImageFormat {
  JPEG = 'image/jpeg',
  PNG = 'image/png'
}

export enum ParamType {
  Body = 'body',
  Query = 'query',
  Param = 'param',
  Custom = 'custom'
}
