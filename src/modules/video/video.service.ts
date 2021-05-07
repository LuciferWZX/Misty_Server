import { Injectable } from '@nestjs/common';
import { CosService } from '../../cos/cos.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from '../../schemas/video.schema';
import { VideoEditStatus } from '../../common/common.interface';
import { Tag, TagDocument } from '../../schemas/tag.schema';

@Injectable()
export class VideoService {
  constructor(
    private readonly cosService: CosService,
    @InjectModel('Video') private videoModal: Model<VideoDocument>,
    //将 Tag 模型注入到server中
    @InjectModel('Tag') private tagModel: Model<TagDocument>,
  ) {}

  //@todo 保存尚未编辑的视频
  async saveProcessingVideo(
    uploaderId: string,
    videoTitle: string,
    videoBucketKey: string,
    videoLocation: string,
  ): Promise<Video> {
    return this.videoModal.findOneAndUpdate(
      {
        uploaderId: uploaderId,
        editStatus: VideoEditStatus.processing,
      },
      {
        $set: {
          videoTitle: videoTitle,
          videoBucketKey: videoBucketKey,
          videoLocation: `https://${videoLocation}`,
        },
      },
      {
        upsert: true,
        new: true,
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
  /**
   * @todo 批量插入tag
   * @param tags
   * @param creatorId
   */
  async batchCreateTags(tags: string[], creatorId: string): Promise<void> {
    for (const tag of tags) {
      const data = await this.tagModel.findOne({ label: tag });
      if (!data) {
        const createTag = new this.tagModel({
          label: tag,
          creatorId: creatorId,
        });
        await createTag.save();
      }
    }
  }

  /**
   * @todo 查询所有的标签
   */
  async getAllTags(): Promise<Tag[]> {
    return this.tagModel.find();
  }
}
