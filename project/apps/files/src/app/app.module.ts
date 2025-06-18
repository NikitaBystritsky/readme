import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesConfigModule } from '@project/lib/config/files';
import { getMongooseOptions } from '@project/lib/shared/helpers';

import { FilesUploaderModule } from './uploader/files-uploader.module';

@Module({
  imports: [
    FilesUploaderModule,
    FilesConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions('filesMongo')),
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
