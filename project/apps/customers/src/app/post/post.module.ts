import { Module } from '@nestjs/common';

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/lib/shared/helpers';

import { PostService } from './post.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('customersRabbit')
    )
  ],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
