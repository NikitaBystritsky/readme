import { PostType, SortType } from '@project/lib/shared/app/types';

export const NEWS_FEED_ROUTE_PREFIX = 'news-feed';
export const NEWS_FEED_TAG = 'News Feed';

export const NEWS_FEED_MESSAGE = 'The publication by users ID were successfully found.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';

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
export const GET_BY_USER_API_QUERY = {
  NAME: 'user',
  TYPE: 'string',
  REQUIRED: false,
  DESCRIPTION: 'Get publications from a specific user ID.'
};
export const GET_PAGE_API_QUERY = {
  NAME: 'page',
  TYPE: 'number',
  REQUIRED: false,
  DESCRIPTION: 'Get a specific page.'
};
export const GET_POSTS_COUNT_API_QUERY = {
  NAME: 'count',
  TYPE: 'number',
  REQUIRED: false,
  DESCRIPTION: 'Get a certain number of publications.'
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

export const NEWS_FEED_API_OPERATION = {
  SUMMARY: 'Get publications for news feed.',
  DESCRIPTION: 'Get publications by subscribed users for news feed.'
};
