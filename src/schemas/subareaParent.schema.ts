import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'tb_subareaParent',
  timestamps: true,
  autoIndex: true,
  id: true,
  versionKey: false,
})
export class SubareaParent extends Document {
  id: string;
  @Prop({
    required: true,
  })
  creatorId: string;
  @Prop({
    required: true,
    unique: true,
  })
  label: string; //父亲分区的label
  @Prop()
  desc: string; //父亲分区的描述
}
export type SubareaParentDocument = SubareaParent & Document;
export const SubareaParentSchema = SchemaFactory.createForClass(SubareaParent);
