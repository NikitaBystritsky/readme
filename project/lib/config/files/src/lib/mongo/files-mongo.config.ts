import { registerAs } from '@nestjs/config';

import { getMongooseConfig } from '@project/lib/shared/helpers';

export const FilesMongoConfig = registerAs('filesMongo', getMongooseConfig);
