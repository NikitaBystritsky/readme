export const USER_ROUTE_PREFIX = 'users';
export const USER_TAG = 'Users';

export const NOT_FOUND_BY_USER_ID_MESSAGE = 'The user with this ID not found.';
export const USER_EXISTS_MESSAGE = 'The user with this email: test@mail.com exists.';
export const WRONG_PASSWORD_MESSAGE = 'User password is wrong.';
export const USER_SUBSCRIBE_MESSAGE = `The user's subscription status has been changed.`;

export const TOKEN_NOT_FOUND_ERROR = 'Token with this ID does not exists.';
export const TOKEN_CREATE_ERROR = 'The access token was successfully created.';

export const SUCCESSFUL_AUTHORIZATION_RESPONSE = 'The user successfully logged in.';
export const USER_CREATED_RESPONSE = 'The new user has been successfully created.';
export const VALIDATION_ERROR_RESPONSE = 'Validation error.';
export const AUTHENTICATION_ERROR_RESPONSE = 'The wrong email or password was entered.';
export const USER_FOUND_RESPONSE = 'The user by ID were successfully found.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';
export const USER_UPDATE_RESPONSE = 'The user was successfully update.';

export const CREATE_USER_API_OPERATION = {
  SUMMARY: 'Create a new user.',
  DESCRIPTION: `To create a user,
    data is transmitted via "multipart/form-data".
    The field name for the avatar is "avatar", and for the string data is "data".`
};
export const USER_INFO_API_OPERATION = {
  SUMMARY: 'Get user information.',
  DESCRIPTION: 'Get detailed information about a specific user by ID.'
};
export const USER_UPDATE_API_OPERATION = {
  SUMMARY: 'Change password.',
  DESCRIPTION: 'Change user password by user ID.'
};
export const USER_AUTH_API_OPERATION = {
  SUMMARY: 'User authorization.',
  DESCRIPTION: 'User login and password authorization.'
};
export const USER_SUBSCRIBE_API_OPERATION = {
  SUMMARY: 'Subscribe or unsubscribe to a user.',
  DESCRIPTION: 'Subscribe or unsubscribe to a user by user ID.'
};
export const REFRESH_TOKEN_API_OPERATION = {
  SUMMARY: 'Refresh token.',
  DESCRIPTION: 'Update the access token and the refresh token whit refresh token.'
};

export const USER_ID_API_QUERY = {
  NAME: 'userId',
  TYPE: 'string',
  REQUIRED: true,
  DESCRIPTION: 'The ID of the user.'
};

export const USER_ID_API_PARAM = {
  NAME: 'id',
  TYPE: 'string',
  DESCRIPTION: 'The ID of the user.'
};
