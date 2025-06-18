import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { FilesUploaderController } from './files-uploader.controller';
import { SERVE_ROOT } from './files-uploader.constant';
import { FilesUploaderService } from './files-uploader.service';
import { FilesUploaderRepository } from './files-uploader.repository';
import { FilesModel, FilesSchema } from './files.model';



@Module({
  imports: [
    MongooseModule.forFeature(
      [{name: FilesModel.name, schema: FilesSchema}]
    ),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('filesApp.uploadDirectory');

        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true
          }
        }]
      }
    })
  ],
  controllers: [FilesUploaderController],
  providers: [FilesUploaderService,FilesUploaderRepository]
})

export class FilesUploaderModule {}
