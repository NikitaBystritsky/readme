export const USER_EXISTS_MESSAGE = 'The user with this email: %email% exists.';
export const NOT_FOUND_BY_EMAIL_MESSAGE = 'The user with this email: %email% not found.';
export const NOT_FOUND_BY_ID_MESSAGE = 'The user with this id: %id% not found.';
export const WRONG_PASSWORD_MESSAGE = 'User password is wrong';

export const USER_CREATED_RESPONSE = 'The new user has been successfully created.';
export const VALIDATION_ERROR_RESPONSE = 'Validation error.';
export const EXISTING_EMAIL_RESPONSE = 'The user with this email is registered.';
export const SUCCESSFUL_AUTHORIZATION_RESPONSE = 'The user successfully logged in.';
export const AUTHENTICATION_ERROR_RESPONSE = 'The wrong email or password was entered.';
export const NOT_FOUND_BY_ID_RESPONSE = 'The user with this id not found.';

export const ROUTE_PREFIX = 'user';
export const TAG = 'User';

export const FullNameProperty = {
  DESCRIPTION: 'Last name and first name of the user.',
  EXAMPLE: 'Глуханько Антон'
}

export const EmailProperty = {
  DESCRIPTION: 'The user unique email address.',
  EXAMPLE: 'user@mail.ru'
}

export const PasswordProperty = {
  DESCRIPTION: 'The user password.',
  EXAMPLE: '123456'
}

export const OldPasswordProperty = {
  DESCRIPTION: 'The user old password.',
  EXAMPLE: '123456'
}

export const AvatarProperty = {
  DESCRIPTION: 'The user avatar path.',
  EXAMPLE: 'upload/default-avatar.png'
}

export const IdProperty = {
  DESCRIPTION: 'A unique user ID.',
  EXAMPLE: '667c673deb3171fbdaa4ce26'
}

export const AccessProperty = {
  DESCRIPTION: 'The user access token.',
  EXAMPLE: 'T2VyLm5lckBnbWFpbC5jb20'
}

export const CreatedAtProperty = {
  DESCRIPTION: 'The created date.',
  EXAMPLE: '2022-01-18T17:36:34.064Z'
}

export const PostCountProperty = {
  DESCRIPTION: 'Number of user posts.',
  EXAMPLE: '5'
}

export const SubscribeCountProperty = {
  DESCRIPTION: 'Number of subscribers.',
  EXAMPLE: '1'
}

export enum Route {
  Registration = 'sign-up',
  Authentication = 'sign-in',
  UserParam = ':id',
}
