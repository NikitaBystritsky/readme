import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { ConfigCustomersModule } from '@project/lib/config/customers';
import { getMongooseOptions } from '@project/lib/shared/helpers';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    NotificationModule,
    ConfigCustomersModule,
    MongooseModule.forRootAsync(getMongooseOptions('customersMongo')),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
