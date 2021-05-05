import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'tb_subareaChildren',
  timestamps: true,
  autoIndex: true,
  id: true,
  versionKey: false,
})
export class SubareaChildren extends Document {
  id: string;
  @Prop({
    required: true,
  })
  creatorId: string;
  @Prop({
    required: true,
  })
  parentId: string; //所属的父亲分区
  @Prop({
    required: true,
    unique: true,
  })
  label: string; //子分区的label
  @Prop({
    required: true,
  })
  desc: string; //子分区的描述
}
export type SubareaChildrenDocument = SubareaChildren & Document;
export const SubareaChildrenSchema = SchemaFactory.createForClass(
  SubareaChildren,
);
