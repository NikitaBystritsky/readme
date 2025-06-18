import { registerAs } from '@nestjs/config';

import { getRabbitMQConfig } from '@project/lib/shared/helpers';

export const NotificationsRabbitConfig = registerAs('notificationsRabbit', getRabbitMQConfig);
