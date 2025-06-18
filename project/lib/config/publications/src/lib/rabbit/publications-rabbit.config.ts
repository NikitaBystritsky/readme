import { registerAs } from '@nestjs/config';

import { getRabbitMQConfig } from '@project/lib/shared/helpers';

export const PublicationsRabbitConfig = registerAs('publicationsRabbit', getRabbitMQConfig);
