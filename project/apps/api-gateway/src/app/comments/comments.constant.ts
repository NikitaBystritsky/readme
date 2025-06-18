export const COMMENT_ROUTE_PREFIX = 'publications/:postId/comments';
export const COMMENT_TAG = 'Comments';
export const POST_ID_PARAM = 'postId';

export const NOT_FOUND_BY_POST_ID_MESSAGE = 'The publication with this ID not found.';

export const COMMENT_CREATED_RESPONSE = 'The new comment has been successfully created.';
export const COMMENT_DELETE_RESPONSE = 'The comment was successfully deleted.';
export const COMMENTS_FOUND_RESPONSE = 'The comments were successfully found.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';
export const VALIDATION_ERROR_RESPONSE = 'Validation error.';

export const COMMENT_ID_API_PARAM = {
  NAME: 'id',
  TYPE: 'string',
  DESCRIPTION: 'The ID of the comment.'
};
export const POST_ID_API_PARAM = {
  NAME: 'id',
  TYPE: 'string',
  DESCRIPTION: 'The ID of the publication.'
};

export const GET_COMMENTS_COUNT_API_QUERY = {
  NAME: 'count',
  TYPE: 'number',
  REQUIRED: false,
  DESCRIPTION: 'Get a certain number of comments.'
};
export const GET_PAGE_API_QUERY = {
  NAME: 'page',
  TYPE: 'number',
  REQUIRED: false,
  DESCRIPTION: 'Get a specific page.'
};

export const CREATE_COMMENT_API_OPERATION = {
  SUMMARY: 'Create comment.',
  DESCRIPTION: 'Create comment for publication by publication ID.'
};
export const DELETE_COMMENT_API_OPERATION = {
  SUMMARY: 'Delete comment.',
  DESCRIPTION: 'Delete comment by comment ID.'
};
export const GET_COMMENTS_API_OPERATION = {
  SUMMARY: 'Get comments.',
  DESCRIPTION: 'Get all comments for publications by publication ID.'
};
