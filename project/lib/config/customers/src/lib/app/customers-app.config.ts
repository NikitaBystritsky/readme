import { registerAs } from '@nestjs/config';

import { getAppConfig } from '@project/lib/shared/helpers';

export const CustomersAppConfig = registerAs('customersApp', getAppConfig);
