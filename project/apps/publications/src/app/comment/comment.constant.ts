export const DEFAULT_MAX_COMMENT_COUNT = 50;
export const NOT_FOUND_BY_ID_MESSAGE ='The comment with this id: %id% not found.';

export const COMMENT_CREATED_RESPONSE = 'The comment was successfully created.';
export const COMMENTS_FOUND_RESPONSE = 'The comments were successfully found.';
export const COMMENT_DELETE_RESPONSE = 'The comment was successfully deleted.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';
export const CONTENT_TYPE_MESSAGE = 'The field must be a string.';
export const CONTENT_LENGTH_MESSAGE = 'The length should be from 10 to 300 characters.';
export const USER_ID_TYPE_MESSAGE = 'The Id must be of the MongoId type.';
export const REQUIRED_MESSAGE = 'The field should not be empty.';

export const ROUTE_PREFIX = 'posts/:postId/comments';
export const TAG = 'Comments';

export const CONTENT_PROPERTY = {
  DESCRIPTION: 'The text of the comment.',
  EXAMPLE: 'Красивый вид на озеро и горы).'
}

export const ID_PROPERTY = {
  DESCRIPTION: 'A unique ID.',
  EXAMPLE: '17177772-33ba-42d8-a4ca-27758d30608e'
}

export const USER_ID_PROPERTY = {
  DESCRIPTION: 'A unique user ID.',
  EXAMPLE: '667c673deb3171fbdaa4ce26'
}

export const CREATED_AT_PROPERTY = {
  DESCRIPTION: 'Date the comment was created.',
  EXAMPLE: '2022-01-18T17:36:34.064Z'
}

export const COMMENT_LENGTH = {
  MIN: 10,
  MAX: 300
}

export enum Route {
  Root = '/',
  CommentParam = ':id',
}
