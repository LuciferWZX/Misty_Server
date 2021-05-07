import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VideoEditStatus } from '../common/common.interface';

@Schema({
  collection: 'tb_video',
  timestamps: true,
  autoIndex: true,
  id: true,
  versionKey: false,
})
export class Video extends Document {
  id: string;
  @Prop({
    required: true,
  })
  uploaderId: string; //上传视频的人的id
  @Prop({
    required: true,
    minlength: [2, '标题长度不能小于2'],
    maxlength: [10, '标题长度不能大于80'],
  })
  videoTitle: string; //视频的标题
  @Prop({
    required: true,
    default: null,
  })
  videoDesc: string; //视频的描述
  @Prop({
    required: true,
    default: null,
  })
  videoImage: string; //视频的图片
  @Prop({
    required: true,
  })
  videoBucketKey: string; //视频存入的腾讯存储桶的key
  @Prop({
    required: true,
  })
  videoLocation: string;
  @Prop({
    default: [],
    required: true,
  })
  videoTags: string[]; //视频的tag
  @Prop({
    required: true,
    default: VideoEditStatus.processing,
  })
  editStatus: VideoEditStatus; //该视频的状态是否是编辑状态
}
export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);
