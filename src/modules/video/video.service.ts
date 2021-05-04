import { Injectable } from '@nestjs/common';
import { CosService } from '../../cos/cos.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from '../../schemas/video.schema';

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
  ): Promise<any> {
    return this.videoModal.updateOne(
      {
        uploaderId: uploaderId,
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
    });
  }
}
