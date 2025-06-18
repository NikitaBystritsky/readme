import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesConfigModule, getMongooseOptions } from '@project/lib/config/files';

import { FilesUploaderModule } from './uploader/files-uploader.module';

@Module({
  imports: [
    FilesUploaderModule,
    FilesConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
