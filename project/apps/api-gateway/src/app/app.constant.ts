import { PostType, SortType } from '@project/lib/shared/app/types';

export enum ApplicationServiceURL {
  Users = 'http://localhost:5000/api/user',
  Posts = 'http://localhost:5010/api/posts',
  Files = 'http://localhost:5020/api/files',
  Notifications = 'http://localhost:5030/api/notification'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
export const POST_TYPE = 'photo';

export const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

export const USER_ROUTE_PREFIX = 'users';
export const USER_TAG = 'Users';
export const PUBLICATION_ROUTE_PREFIX = 'publications';
export const PUBLICATION_TAG = 'Publications';
export const NOTIFICATION_ROUTE_PREFIX = 'notifications';
export const NOTIFICATION_TAG = 'Notifications';
export const COMMENT_ROUTE_PREFIX = 'publications/:postId/comments';
export const COMMENT_TAG = 'Comments';
export const LIKE_ROUTE_PREFIX = 'publications/:postId/like';
export const LIKE_TAG = 'Likes';
export const NEWS_FEED_ROUTE_PREFIX = 'news-feed';
export const NEWS_FEED_TAG = 'News Feed';

export const NOT_FOUND_BY_POST_ID_MESSAGE = 'The publication with this ID: 9bce0016-e0d4-42ef-9818-296036e39a00 not found.';
export const NOT_FOUND_BY_USER_ID_MESSAGE = 'The user with this ID: 67c452f63976329cd1e498cc not found.';
export const POST_CREATED_RESPONSE = 'The publication was successfully created.';
export const POST_REPOSTED_RESPONSE = 'The publication was successfully reposted.';
export const REPOST_ERROR_MESSAGE = 'Allowed to repost the publication can be done once';
export const VALIDATION_ERROR_RESPONSE = 'Validation error.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';
export const POSTS_FOUND_RESPONSE = 'The publications were successfully found.';
export const POST_FOUND_RESPONSE = 'The publication by ID were successfully found.';
export const POST_UPDATE_RESPONSE = 'The publication was successfully update.';
export const POST_DELETE_RESPONSE = 'The publication was successfully deleted.';
export const USER_CREATED_RESPONSE = 'The new user has been successfully created.';
export const SUCCESSFUL_AUTHORIZATION_RESPONSE = 'The user successfully logged in.';
export const AUTHENTICATION_ERROR_RESPONSE = 'The wrong email or password was entered.';
export const USER_FOUND_RESPONSE = 'The user by ID were successfully found.';
export const USER_EXISTS_MESSAGE = 'The user with this email: test@mail.com exists.';
export const USER_UPDATE_RESPONSE = 'The user was successfully update.';
export const WRONG_PASSWORD_MESSAGE = 'User password is wrong.';
export const USER_SUBSCRIBE_MESSAGE = `The user's subscription status has been changed.`;
export const TOKEN_NOT_FOUND_ERROR = 'Token with ID: 9bce0016-e0d4-42ef-9818-296036e39a00 does not exists.';
export const TOKEN_CREATE_ERROR = 'The access token was successfully created.';
export const POST_ID_PARAM = 'postId';
export const POST_LIKE_MESSAGE = `The post's liked status has been changed.`;
export const NEWS_FEED_MESSAGE = 'The publication by users ID were successfully found.';
export const NOTIFICATION_MESSAGE = 'The notification were successfully send.';
export const COMMENT_CREATED_RESPONSE = 'The new comment has been successfully created.';
export const COMMENT_DELETE_RESPONSE = 'The comment was successfully deleted.';
export const COMMENTS_FOUND_RESPONSE = 'The comments were successfully found.';

export const POST_CREATE_API_OPERATION = {
  SUMMARY: 'Create a new publication.',
  DESCRIPTION: `To create a publication of the "Photo" type,
    data is transmitted via "multipart/form-data".
    The field name for the image is "photo", and for the string data is "data".
    In other cases, they are transmitted via "application/json".`
};
export const POST_REPOST_API_OPERATION = {
  SUMMARY: 'A repost of a publication.',
  DESCRIPTION: `User's publication repost.`
};
export const GET_POSTS_API_OPERATION = {
  SUMMARY: 'Get publications.',
  DESCRIPTION: 'Get all publications with the "published" status.'
};
export const GET_DRAFT_POSTS_API_OPERATION = {
  SUMMARY: 'Get drafts.',
  DESCRIPTION: 'Get publications with the "draft" status.'
};
export const GET_POST_API_OPERATION = {
  SUMMARY: 'Get publication.',
  DESCRIPTION: 'Get detailed information for publication by ID.'
};
export const POST_UPDATE_API_OPERATION = {
  SUMMARY: 'Change the publication.',
  DESCRIPTION: 'Change the publication information.'
};
export const POST_DELETE_API_OPERATION = {
  SUMMARY: 'Delete the publication.',
  DESCRIPTION: 'Delete the publication by ID.'
};
export const POSTS_SEARCH_API_OPERATION = {
  SUMMARY: 'Search the publications.',
  DESCRIPTION: 'Search for no more than 20 publications by title that have titles.'
};
export const CREATE_USER_API_OPERATION = {
  SUMMARY: 'Create a new user.',
  DESCRIPTION: `To create a user,
    data is transmitted via "multipart/form-data".
    The field name for the avatar is "avatar", and for the string data is "data".`
};
export const USER_AUTH_API_OPERATION = {
  SUMMARY: 'User authorization.',
  DESCRIPTION: 'User login and password authorization.'
};
export const USER_INFO_API_OPERATION = {
  SUMMARY: 'Get user information.',
  DESCRIPTION: 'Get detailed information about a specific user by ID.'
};
export const USER_UPDATE_API_OPERATION = {
  SUMMARY: 'Change password.',
  DESCRIPTION: 'Change user password by user ID.'
};
export const USER_SUBSCRIBE_API_OPERATION = {
  SUMMARY: 'Subscribe or unsubscribe to a user.',
  DESCRIPTION: 'Subscribe or unsubscribe to a user by user ID.'
};
export const REFRESH_TOKEN_API_OPERATION = {
  SUMMARY: 'Refresh token.',
  DESCRIPTION: 'Update the access token and the refresh token whit refresh token.'
};
export const LIKE_POST_API_OPERATION = {
  SUMMARY: 'Like or unlike publication.',
  DESCRIPTION: 'Like or unlike publication by the user.'
};
export const NEWS_FEED_API_OPERATION = {
  SUMMARY: 'Get publications for news feed.',
  DESCRIPTION: 'Get publications by subscribed users for news feed.'
};
export const NOTIFICATION_API_OPERATION = {
  SUMMARY: 'Send notification.',
  DESCRIPTION: 'Send last published publications for subscribed user.'
};
export const CREATE_COMMENT_API_OPERATION = {
  SUMMARY: 'Create comment.',
  DESCRIPTION: 'Create comment for publication by publication ID.'
};
export const GET_COMMENTS_API_OPERATION = {
  SUMMARY: 'Get comments.',
  DESCRIPTION: 'Get all comments for publications by publication ID.'
};
export const DELETE_COMMENT_API_OPERATION = {
  SUMMARY: 'Delete comment.',
  DESCRIPTION: 'Delete comment by comment ID.'
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
export const COMMENT_ID_API_PARAM = {
  NAME: 'id',
  TYPE: 'string',
  DESCRIPTION: 'The ID of the comment.'
};

export const GET_BY_USER_API_QUERY = {
  NAME: 'user',
  TYPE: 'string',
  REQUIRED: false,
  DESCRIPTION: 'Get publications from a specific user ID.'
};
export const GET_BY_TAG_API_QUERY = {
  NAME: 'tag',
  TYPE: 'string',
  REQUIRED: false,
  DESCRIPTION: 'Get publications from a specific tag name.'
};
export const GET_BY_TYPE_API_QUERY = {
  NAME: 'postType',
  ENUM: PostType,
  REQUIRED: false,
  DESCRIPTION: 'Get publications from a specific type.'
};
export const ORDER_BY_DATE_API_QUERY = {
  NAME: 'orderDate',
  ENUM: SortType,
  REQUIRED: false,
  DESCRIPTION: 'Get publications sorted by date in des or asc order.'
};
export const ORDER_BY_LIKES_API_QUERY = {
  NAME: 'orderLikes',
  ENUM: SortType,
  REQUIRED: false,
  DESCRIPTION: 'Get publications sorted by likes in des or asc order.'
};
export const ORDER_BY_RATING_API_QUERY = {
  NAME: 'orderRating',
  ENUM: SortType,
  REQUIRED: false,
  DESCRIPTION: 'Get publications sorted by rating in des or asc order.'
};
export const GET_POSTS_COUNT_API_QUERY = {
  NAME: 'count',
  TYPE: 'number',
  REQUIRED: false,
  DESCRIPTION: 'Get a certain number of publications.'
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
export const SEARCH_BY_TITTLE_API_QUERY = {
  NAME: 'title',
  TYPE: 'string',
  REQUIRED: true,
  DESCRIPTION: 'Search for a publication by title.'
};
export const USER_ID_API_QUERY = {
  NAME: 'userId',
  TYPE: 'string',
  REQUIRED: true,
  DESCRIPTION: 'The ID of the user.'
};
export const USER_EMAIL_API_QUERY = {
  NAME: 'email',
  TYPE: 'string',
  REQUIRED: true,
  DESCRIPTION: 'The email of the user.'
};
