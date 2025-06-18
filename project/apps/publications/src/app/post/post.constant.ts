import { SortType } from '@project/lib/shared/app/types';

export const MAX_POST_COUNT_SEARCH = 20;
export const DEFAULT_SORT_TYPE = SortType.Desc;
export const NOT_FOUND_BY_ID_MESSAGE = 'The publication with this id: %id% not found.';
export const POST_REPOST_ERROR_MESSAGE = 'Allowed to repost the publication can be done once';
export const REPOST_ERROR_MESSAGE = 'А repost cannot be reposted';
export const POST_CREATED_RESPONSE = 'The publication was successfully created.';
export const POST_REPOSTED_RESPONSE = 'The publication was successfully reposted.';
export const POSTS_FOUND_RESPONSE = 'The publications were successfully found.';
export const POSTS_FOUND_BY_IDS_RESPONSE = 'The publications by IDs were successfully found.';
export const LATEST_POSTS_FOUND_RESPONSE = 'The latest publications were successfully found.';
export const POSTS_COUNT_FOUND_RESPONSE = 'The publications count by user ID were successfully found.';
export const POST_FOUND_RESPONSE = 'The publication by ID were successfully found.';
export const POST_UPDATE_RESPONSE = 'The publication was successfully update.';
export const POST_DELETE_RESPONSE = 'The publication was successfully deleted.';
export const POST_NOT_FOUND_RESPONSE = 'The publication with this id not found.'
export const VALIDATION_RESPONSE = 'Validation error.';
export const NOT_AUTHORIZED_RESPONSE = 'The user is not logged in.';
export const NOTIFICATIONS_SEND_RESPONSE = 'Notifications sent successfully';
export const USER_ID_TYPE_MESSAGE = 'The Id must be of the MongoId type.';
export const REQUIRED_MESSAGE = 'The field should not be empty.';
export const DATE_TYPE_MESSAGE = 'The field must be one of the ISO8601 type.';

export const ROUTE_PREFIX = 'posts';
export const TAG = 'Publications';
