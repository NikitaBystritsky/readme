export const NOT_FOUND_BY_ID_MESSAGE = 'The file with this id: %id% not found.';
export const FILE_WRITE_ERROR = 'Error while writing file: %error%'
export const SERVE_ROOT = '/static';
export const DATE_FORMAT = 'YYYY MMMM';
export const ROUTE_PREFIX = 'files';
export const MAX_UPLOAD_FILES = 1;

export const TAG = 'FileUpload';
export const FILE_UPLOADED_RESPONSE = 'The image has been successfully uploaded.';
export const VALIDATION_RESPONSE = 'Validation error.';
export const NOT_FOUND_BY_ID_RESPONSE = 'The image with this id not found.';

export const IdProperty = {
  DESCRIPTION: 'A unique image ID.',
  EXAMPLE: '6798a5b2ecc910bd68532f0a'
}

export const OriginalNameProperty = {
  DESCRIPTION: 'Original name of the uploaded image.',
  EXAMPLE: 'avatar.jpg'
}

export const SubDirectoryProperty = {
  DESCRIPTION: 'Sub directory of the uploaded image.',
  EXAMPLE: 'avatar/2025/January'
}

export const CatalogProperty = {
  DESCRIPTION: 'Catalog of the uploaded image, must be "avatar" or "photo".',
  EXAMPLE: 'avatar'
}

export const SizeProperty = {
  DESCRIPTION: 'Size of the uploaded image.',
  EXAMPLE: '78620'
}

export const MimetypeProperty = {
  DESCRIPTION: 'File extension of the uploaded image.',
  EXAMPLE: 'image/jpeg'
}

export const HashNameProperty = {
  DESCRIPTION: 'Hash name of the uploaded image.',
  EXAMPLE: 'e0986884-f994-4899-a852-716757fb4b60.jpeg'
}

export const PathNameProperty = {
  DESCRIPTION: 'Full directory of the uploaded image.',
  EXAMPLE: 'uploads/avatar/2025/January/e0986884-f994-4899-a852-716757fb4b60.jpeg'
}

export const CreatedAtProperty = {
  DESCRIPTION: 'The created date.',
  EXAMPLE: '2025-01-28T09:38:58.334Z'
}

export enum Route {
  Upload = 'upload',
  FileParam = ':id',
}
