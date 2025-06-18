import { registerAs } from '@nestjs/config';

import { getRabbitMQConfig } from '@project/lib/shared/helpers';

export const CustomersRabbitConfig = registerAs('customersRabbit', getRabbitMQConfig);
