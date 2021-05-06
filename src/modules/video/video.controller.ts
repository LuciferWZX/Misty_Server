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
import { BucketField } from '../../cos/type';
import { getFileSuffix } from '../../utils/help';
import { CreateVideoEntity } from './entity/create-video-entity';

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
    const dayjs = require('dayjs');
    const { id } = params;
    //@todo 先查询表里是否有名称 一样的视频 有 找到视频的videoBucketKey并删除
    const video = await this.videoService.getProcessingVideo(id);
    if (video) {
      const data = await this.cosService.deleteVideo({
        accountId: video.uploaderId,
        videoBucketKey: video.videoBucketKey,
      });
      if (data.statusCode === HttpStatus.NO_CONTENT) {
        await this.videoService.abortProcessingVideo(video.uploaderId);
      }
    }
    const tenXunFileName = `${dayjs().format('YYYYMMDDHHmmss')}.${getFileSuffix(
      videoFile.originalname,
    )}`;
    const response = await this.cosService.uploadVideo({
      accountId: id,
      bufferVideo: videoFile.buffer,
      tenXunFileName: tenXunFileName,
    });
    if (response.statusCode === HttpStatus.OK) {
      //`${BucketField.video}${tenXunFileName}`
      return await this.videoService.saveProcessingVideo(
        id,
        videoFile.originalname,
        `${BucketField.video}${tenXunFileName}`,
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
        videoBucketKey: video.videoBucketKey,
      };
    }
    return null;
  }

  /**
   * @todo 查询全部的标签
   */
  @Get(VideoControllerPath.query_all_tags)
  async queryAlTags(): Promise<Array<{ id: string; label: string }>> {
    const tags = await this.videoService.getAllTags();
    return tags.map((tag) => {
      return {
        id: tag.id,
        label: tag.label,
      };
    });
  }

  /**
   * @todo 创建视频
   * @param createVideoEntity
   */
  @Post(VideoControllerPath.create)
  async create(@Body() createVideoEntity: CreateVideoEntity) {
    await this.videoService.batchCreateTags(
      createVideoEntity.tags,
      createVideoEntity.creatorId,
    );
    return 'www';
  }

  /**
   * @todo 放弃上次编辑（删除存储桶以及数据库的数据）
   * @param params
   */
  @HttpCode(HttpStatus.OK)
  @Post(VideoControllerPath.abortProcessingVideo)
  async abortProcessingVideo(
    @Body()
    params: {
      userId: string;
      videoBucketKey: string;
    },
  ) {
    const { userId, videoBucketKey } = params;
    const data = await this.cosService.deleteVideo({
      accountId: userId,
      videoBucketKey: videoBucketKey,
    });
    if (data.statusCode === HttpStatus.NO_CONTENT) {
      return await this.videoService.abortProcessingVideo(userId);
    }
    return null;
  }
}
