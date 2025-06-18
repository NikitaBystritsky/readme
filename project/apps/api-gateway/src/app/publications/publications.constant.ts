import { PostType, SortType } from '@project/lib/shared/app/types';

export const POST_TYPE = 'photo';
export const PUBLICATION_ROUTE_PREFIX = 'publications';
export const PUBLICATION_TAG = 'Publications';

export const NOT_FOUND_BY_POST_ID_MESSAGE = 'The publication with this ID not found.';
export const POST_REPOST_ERROR_MESSAGE = 'Allowed to repost the publication can be done once';
export const REPOST_ERROR_MESSAGE = 'А repost cannot be reposted';


export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';
export const POST_CREATED_RESPONSE = 'The publication was successfully created.';
export const POST_DELETE_RESPONSE = 'The publication was successfully deleted.';
export const POST_FOUND_RESPONSE = 'The publication by ID were successfully found.';
export const POST_REPOSTED_RESPONSE = 'The publication was successfully reposted.';
export const POST_UPDATE_RESPONSE = 'The publication was successfully update.';
export const POSTS_FOUND_RESPONSE = 'The publications were successfully found.';
export const VALIDATION_ERROR_RESPONSE = 'Validation error.';

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
export const SEARCH_BY_TITTLE_API_QUERY = {
  NAME: 'title',
  TYPE: 'string',
  REQUIRED: true,
  DESCRIPTION: 'Search for a publication by title.'
};

export const POST_ID_API_PARAM = {
  NAME: 'id',
  TYPE: 'string',
  DESCRIPTION: 'The ID of the publication.'
};

export const GET_DRAFT_POSTS_API_OPERATION = {
  SUMMARY: 'Get drafts.',
  DESCRIPTION: 'Get publications with the "draft" status.'
};
export const POST_DELETE_API_OPERATION = {
  SUMMARY: 'Delete the publication.',
  DESCRIPTION: 'Delete the publication by ID.'
};
export const POST_REPOST_API_OPERATION = {
  SUMMARY: 'A repost of a publication.',
  DESCRIPTION: `User's publication repost.`
};
export const POSTS_SEARCH_API_OPERATION = {
  SUMMARY: 'Search the publications.',
  DESCRIPTION: 'Search for no more than 20 publications by title that have titles.'
};
export const POST_UPDATE_API_OPERATION = {
  SUMMARY: 'Change the publication.',
  DESCRIPTION: 'Change the publication information.'
};
export const GET_POST_API_OPERATION = {
  SUMMARY: 'Get publication.',
  DESCRIPTION: 'Get detailed information for publication by ID.'
};
export const GET_POSTS_API_OPERATION = {
  SUMMARY: 'Get publications.',
  DESCRIPTION: 'Get all publications with the "published" status.'
};
export const POST_CREATE_API_OPERATION = {
  SUMMARY: 'Create a new publication.',
  DESCRIPTION: `To create a publication of the "Photo" type,
    data is transmitted via "multipart/form-data".
    The field name for the image is "photo", and for the string data is "data".
    In other cases, they are transmitted via "application/json".`
};
