import {
  Controller,
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

@Controller(Route.video)
export class VideoController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Post(VideoControllerPath.uploadVideo)
  @UseInterceptors(FileInterceptor('videoFile'))
  async uploadVideo(
    @UploadedFile() videoFile: FileEntity,
    @Query() params: { id: string },
  ) {
    const { id } = params;
    console.log(1, videoFile);
    console.log(2, id);
    return {
      videoFile,
      id,
    };
  }
}
