import { Injectable } from '@nestjs/common';
import { CosService } from '../../cos/cos.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from '../../schemas/video.schema';
import { VideoEditStatus } from '../../common/common.interface';

@Injectable()
export class VideoService {
  constructor(
    private readonly cosService: CosService,
    @InjectModel('Video') private videoModal: Model<VideoDocument>,
  ) {}

  //@todo 保存尚未编辑的视频
  async saveProcessingVideo(
    uploaderId: string,
    videoTitle: string,
  ): Promise<Video> {
    return this.videoModal.updateOne(
      {
        uploaderId: uploaderId,
        editStatus: VideoEditStatus.processing,
      },
      {
        $set: {
          videoTitle: videoTitle,
        },
      },
      {
        upsert: true,
      },
    );
  }
  //@todo 查询尚未编辑的视频
  async getProcessingVideo(uploaderId: string): Promise<Video> {
    return this.videoModal.findOne({
      uploaderId: uploaderId,
      editStatus: VideoEditStatus.processing,
    });
  }

  /**
   * @todo 删除未完成的数据
   * @param uploaderId
   */
  async abortProcessingVideo(uploaderId: string): Promise<Video> {
    return this.videoModal.findOneAndDelete({
      uploaderId: uploaderId,
      editStatus: VideoEditStatus.processing,
    });
  }
}
