export const LIKE_ROUTE_PREFIX = 'publications/:postId/like';
export const LIKE_TAG = 'Likes';
export const POST_ID_PARAM = 'postId';

export const NOT_FOUND_BY_POST_ID_MESSAGE = 'The publication with this ID not found.';
export const POST_LIKE_MESSAGE = `The post's liked status has been changed.`;

export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';

export const LIKE_POST_API_OPERATION = {
  SUMMARY: 'Like or unlike publication.',
  DESCRIPTION: 'Like or unlike publication by the user.'
};

export const POST_ID_API_PARAM = {
  NAME: 'id',
  TYPE: 'string',
  DESCRIPTION: 'The ID of the publication.'
};
export const USER_ID_API_PARAM = {
  NAME: 'id',
  TYPE: 'string',
  DESCRIPTION: 'The ID of the user.'
};
