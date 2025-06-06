export const DEFAULT_MAX_COMMENT_COUNT = 50;
export const NOT_FOUND_BY_ID_MESSAGE ='The comment with this id: %id% not found.';

export const COMMENT_CREATED_RESPONSE = 'The comment was successfully created.';
export const COMMENTS_FOUND_RESPONSE = 'The comments were successfully found.';
export const COMMENT_DELETE_RESPONSE = 'The comment was successfully deleted.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';

export const ROUTE_PREFIX = 'posts/:postId/comments';
export const TAG = 'Comments';

export const ContentProperty = {
  DESCRIPTION: 'The text of the comment.',
  EXAMPLE: 'Красивый вид на озеро и горы).'
}

export const IdProperty = {
  DESCRIPTION: 'A unique ID.',
  EXAMPLE: '17177772-33ba-42d8-a4ca-27758d30608e'
}

export const UserIdProperty = {
  DESCRIPTION: 'A unique user ID.',
  EXAMPLE: '667c673deb3171fbdaa4ce26'
}

export const CreatedAtProperty = {
  DESCRIPTION: 'Date the comment was created.',
  EXAMPLE: '2022-01-18T17:36:34.064Z'
}

export enum Route {
  Root = '/',
  CommentParam = ':id',
}
