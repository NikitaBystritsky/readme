export const MAX_DESCRIPTION_LENGTH = 300;
export const MAX_TAGS = 8;
export const REG_EXP = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
export const COMMENT_CONTENT_LENGTH_MESSAGE = 'The length should be from 10 to 300 characters.';
export const QUOTE_CONTENT_LENGTH_MESSAGE = 'The length should be from 20 to 300 characters.';
export const DESCRIPTION_LENGTH_MESSAGE = 'The length should be no more than 300 characters.';
export const TAGS_LENGTH_MESSAGE = 'The length of the array should be no more than 8 elements.';
export const POST_STATUS_MESSAGE = 'The field must be one of the types: "published" or "draft".';
export const POST_TYPE_MESSAGE = 'The field must be one of the types: "link", "photo", "quote", "text" or "video".';
export const AUTHOR_LENGTH_MESSAGE = 'The length should be from 3 to 30 characters.';
export const PREVIEW_LENGTH_MESSAGE = 'The preview length should be from 50 to 255 characters.';
export const TITLE_LENGTH_MESSAGE = 'The title length should be from 20 to 50 characters.';
export const TEXT_CONTENT_LENGTH_MESSAGE = 'The content length should be from 100 to 1024 characters.';
export const PASSWORD_LENGTH_MESSAGE = 'The length should be from 6 to 12 characters.';
export const FULL_NAME_LENGTH_MESSAGE = 'The length should be from 3 to 50 characters.';
export const VIDEO_URL_MATCH_MESSAGE = 'The link to the video must be on the YouTube service.';

export const COMMENT_LENGTH = {
  MIN: 10,
  MAX: 300
}
export const AUTHOR_LENGTH = {
  MIN: 3,
  MAX: 50
}
export const QUOTE_CONTENT_LENGTH = {
  MIN: 20,
  MAX: 300
}
export const PREVIEW_LENGTH = {
  MIN: 50,
  MAX: 255
}
export const TITLE_LENGTH = {
  MIN: 20,
  MAX: 50
}
export const TEXT_CONTENT_LENGTH = {
  MIN: 100,
  MAX: 1024
}
export const PASSWORD_LENGTH = {
  MIN: 6,
  MAX: 12
}
export const FULL_NAME_LENGTH = {
  MIN: 3,
  MAX: 50
}
export const COMMENT_CONTENT_PROPERTY = {
  DESCRIPTION: 'The text of the comment.',
  EXAMPLE: 'Beautiful view of the lake and mountains).'
}
export const USER_ID_PROPERTY = {
  DESCRIPTION: 'A unique user ID.',
  EXAMPLE: '667c673deb3171fbdaa4ce26'
}
export const DESCRIPTION_PROPERTY = {
  DESCRIPTION: 'Description of the content.',
  EXAMPLE: 'A progressive framework for creating efficient, reliable and scalable server applications.'
}
export const URL_PROPERTY = {
  DESCRIPTION: 'Valid URL.',
  EXAMPLE: 'https://nestjs.com/'
}
export const PHOTO_PROPERTY = {
  DESCRIPTION: 'Photo in jpg or png format.',
  EXAMPLE: 'upload/cat.jpg'
}
export const TAGS_PROPERTY = {
  DESCRIPTION: 'List of publication tags.',
  EXAMPLE: ['city', 'japan', 'sunrise', 'tokio']
}
export const USER_IDS_PROPERTY = {
  DESCRIPTION: 'List of user IDs.',
  EXAMPLE: ['667c673deb3171fbdaa4ce26', '6257c673deb3171fbdaa4ce2']
}
export const AUTHOR_PROPERTY = {
  DESCRIPTION: 'The author of the quote.',
  EXAMPLE: 'Fyodor Dostoevsky'
}
export const CONTENT_PROPERTY = {
  DESCRIPTION: 'The contents of the publication.',
  EXAMPLE: 'One must love life more than the very meaning of life!'
}
export const IMAGE_PROPERTY = {
  DESCRIPTION: 'Image in jpg or png format.',
  EXAMPLE: 'upload/cat.jpg'
}
export const PREVIEW_PROPERTY = {
  DESCRIPTION: 'Announcement of the publication.',
  EXAMPLE: 'The scientific journal has used AI to create scientific articles.'
}
export const STATUS_PROPERTY = {
  DESCRIPTION: 'The publication status is one of two states: published or draft.',
  EXAMPLE: 'published'
}
export const TYPE_PROPERTY = {
  DESCRIPTION: 'The type of blog post is one of five types: video, text, quote, photo, link.',
  EXAMPLE: 'video'
}
export const TITLE_PROPERTY = {
  DESCRIPTION: 'Title of the publication',
  EXAMPLE: 'Artificial intelligence still deprives people of work.'
}
export const EMAIL_PROPERTY = {
  DESCRIPTION: 'The user unique email address.',
  EXAMPLE: 'user@mail.ru'
}
export const LAST_NOTIFICATION_DATE_PROPERTY = {
  DESCRIPTION: 'Last mailing date of the posts.',
  EXAMPLE: '2022-01-18T17:36:34.064Z'
}
export const PASSWORD_PROPERTY = {
  DESCRIPTION: 'The user password.',
  EXAMPLE: '123456'
}
export const FULL_NAME_PROPERTY = {
  DESCRIPTION: 'Last name and first name of the user.',
  EXAMPLE: 'Глуханько Антон'
}
export const AVATAR_PROPERTY = {
  DESCRIPTION: 'The user avatar.',
  EXAMPLE: 'cbdaaffe-3e30-40ac-a2b6-b15f05a64972.png'
}
export const VIDEO_URL_PROPERTY = {
  DESCRIPTION: 'A valid link to a video page on the YouTube service.',
  EXAMPLE: 'https://www.youtube.com/watch?v=xBInF48M0F0'
}
export const PUBLISHED_DATE_PROPERTY = {
  DESCRIPTION: 'The publication publication date.',
  EXAMPLE: '2022-01-18T17:36:34.064Z'
}
export const OLD_PASSWORD_PROPERTY = {
  DESCRIPTION: 'The user old password.',
  EXAMPLE: '123456'
}
