import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Route, VideoControllerPath } from '../../utils/route';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from '../../cos/entity/file-entity';
import { CosService } from '../../cos/cos.service';
import { VideoService } from './video.service';
import { VideoEntity } from './entity/video-entity';

@Controller(Route.video)
export class VideoController {
  constructor(
    private readonly cosService: CosService,
    private readonly videoService: VideoService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(VideoControllerPath.uploadVideo)
  @UseInterceptors(FileInterceptor('videoFile'))
  async uploadVideo(
    @UploadedFile() videoFile: FileEntity,
    @Query() params: { id: string },
  ) {
    const { id } = params;
    const response = await this.cosService.uploadVideo({
      accountId: id,
      bufferVideo: videoFile.buffer,
      videoTitle: videoFile.originalname,
    });
    if (response.statusCode === HttpStatus.OK) {
      const res = await this.videoService.saveProcessingVideo(
        id,
        videoFile.originalname,
      );
      console.log(11223, res);
      return res;
    }
    console.log(123, response);
    return {
      response,
      id,
    };
  }

  @Get(VideoControllerPath.getUploadingVideo)
  async queryProcessingVideo(
    @Query() params: { id: string },
  ): Promise<VideoEntity> {
    const { id } = params;
    const video = await this.videoService.getProcessingVideo(id);
    return {
      id: video.id,
      uploaderId: video.uploaderId,
      editStatus: video.editStatus,
      videoDesc: video.videoDesc,
      videoImage: video.videoImage,
      videoTags: video.videoTags,
      videoTitle: video.videoTitle,
    };
  }
}
