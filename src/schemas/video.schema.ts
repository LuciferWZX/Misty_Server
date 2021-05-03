import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    minlength: [2, '标题长度不能小于2'],
    maxlength: [10, '标题长度不能大于20'],
  })
  videoTitle: string; //视频的标题
  @Prop({
    required: true,
    default: null,
  })
  videoDesc: string; //视频的描述
  @Prop({
    default: null,
  })
  videoImage: string; //视频的图片
  @Prop({
    default: [],
  })
  videoTags: string[]; //视频的tag
}
export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);
