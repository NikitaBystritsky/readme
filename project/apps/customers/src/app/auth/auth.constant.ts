export const USER_EXISTS_MESSAGE = 'The user with this email: %email% exists.';
export const NOT_FOUND_BY_EMAIL_MESSAGE = 'The user with this email: %email% not found.';
export const NOT_FOUND_BY_ID_MESSAGE = 'The user with this id: %id% not found.';
export const WRONG_PASSWORD_MESSAGE = 'User password is wrong';
export const TOKEN_CREATION_ERROR = 'Error when creating the token.'
export const TOKEN_GENERATE_ERROR = '[Token generation error]: %error%'

export const USER_CREATED_RESPONSE = 'The new user has been successfully created.';
export const VALIDATION_ERROR_RESPONSE = 'Validation error.';
export const EXISTING_EMAIL_RESPONSE = 'The user with this email is registered.';
export const SUCCESSFUL_AUTHORIZATION_RESPONSE = 'The user successfully logged in.';
export const AUTHENTICATION_ERROR_RESPONSE = 'The wrong email or password was entered.';
export const NOT_FOUND_BY_ID_RESPONSE = 'The user with this id not found.';

export const FIELD_TYPE_MESSAGE = 'The field must be a string.';
export const EMAIL_TYPE_MESSAGE = 'The field must be a email type.';
export const PASSWORD_LENGTH_MESSAGE = 'The length should be from 6 to 12 characters.';
export const FULL_NAME_LENGTH_MESSAGE = 'The length should be from 3 to 50 characters.';
export const REQUIRED_MESSAGE = 'The field should not be empty.';

export const ROUTE_PREFIX = 'user';
export const TAG = 'User';

export const FULL_NAME_PROPERTY = {
  DESCRIPTION: 'Last name and first name of the user.',
  EXAMPLE: 'Глуханько Антон'
}

export const EMAIL_PROPERTY = {
  DESCRIPTION: 'The user unique email address.',
  EXAMPLE: 'user@mail.ru'
}

export const PASSWORD_PROPERTY = {
  DESCRIPTION: 'The user password.',
  EXAMPLE: '123456'
}

export const OLD_PASSWORD_PROPERTY = {
  DESCRIPTION: 'The user old password.',
  EXAMPLE: '123456'
}

export const AVATAR_PROPERTY = {
  DESCRIPTION: 'The user avatar path.',
  EXAMPLE: 'upload/default-avatar.png'
}

export const ID_PROPERTY = {
  DESCRIPTION: 'A unique user ID.',
  EXAMPLE: '667c673deb3171fbdaa4ce26'
}

export const ACCESS_PROPERTY = {
  DESCRIPTION: 'The user access token.',
  EXAMPLE: 'T2VyLm5lckBnbWFpbC5jb20'
}

export const CREATED_AT_PROPERTY = {
  DESCRIPTION: 'The created date.',
  EXAMPLE: '2022-01-18T17:36:34.064Z'
}

export const POST_COUNT_PROPERTY = {
  DESCRIPTION: 'Number of user posts.',
  EXAMPLE: '5'
}

export const SUBSCRIBE_COUNT_PROPERTY = {
  DESCRIPTION: 'Number of subscribers.',
  EXAMPLE: '1'
}

export const PASSWORD_LENGTH = {
  MIN: 6,
  MAX: 12
}

export const FULL_NAME_LENGTH = {
  MIN: 3,
  MAX: 50
}

export enum Route {
  Registration = 'sign-up',
  Authentication = 'sign-in',
  UserParam = ':id',
}
