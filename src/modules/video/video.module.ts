import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from '../../schemas/video.schema';
import { VideoController } from './video.controller';
import { CosModule } from '../../cos/cos.module';
import { VideoService } from './video.service';
import { Tag, TagSchema } from '../../schemas/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Video.name, schema: VideoSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
    CosModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
