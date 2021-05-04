import {
  Body,
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
import { Video } from '../../schemas/video.schema';

@Controller(Route.video)
export class VideoController {
  constructor(
    private readonly cosService: CosService,
    private readonly videoService: VideoService,
  ) {}

  /**
   * @todo 上传未编辑的视频
   * @param videoFile
   * @param params
   */
  @HttpCode(HttpStatus.OK)
  @Post(VideoControllerPath.uploadVideo)
  @UseInterceptors(FileInterceptor('videoFile'))
  async uploadVideo(
    @UploadedFile() videoFile: FileEntity,
    @Query() params: { id: string },
  ): Promise<Video | null> {
    const { id } = params;
    const response = await this.cosService.uploadVideo({
      accountId: id,
      bufferVideo: videoFile.buffer,
      videoTitle: videoFile.originalname,
    });
    if (response.statusCode === HttpStatus.OK) {
      return await this.videoService.saveProcessingVideo(
        id,
        videoFile.originalname,
      );
    }
    return null;
  }

  /**
   * @todo 获取上传未完成的视频
   * @param params
   */
  @Get(VideoControllerPath.getUploadingVideo)
  async queryProcessingVideo(
    @Query() params: { id: string },
  ): Promise<VideoEntity | null> {
    const { id } = params;
    const video = await this.videoService.getProcessingVideo(id);
    if (video) {
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
    return null;
  }

  @HttpCode(HttpStatus.OK)
  @Post(VideoControllerPath.abortProcessingVideo)
  async abortProcessingVideo(
    @Body() params: { userId: string; videoTitle: string },
  ) {
    const { userId, videoTitle } = params;
    const data = await this.cosService.deleteVideo({
      accountId: userId,
      videoTitle: videoTitle,
    });
    if (data.statusCode === HttpStatus.NO_CONTENT) {
      return await this.videoService.abortProcessingVideo(userId);
    }
    return null;
  }
}
