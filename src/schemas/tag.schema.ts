import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'tb_tags',
  timestamps: true,
  autoIndex: true,
  id: true,
  versionKey: false,
})
export class Tag extends Document {
  id: string;
  @Prop({
    required: true,
    unique: true,
    maxlength: [20, '标签长度不能大于20'],
  })
  label: string; //标签名称
  @Prop({
    required: true,
  })
  creatorId: string; //创建人的id
}
export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
