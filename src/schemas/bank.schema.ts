import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'tb_bank',
  timestamps: true,
  id: true,
  versionKey: false,
})
export class Bank extends Document {
  id: string;
  //银行名称
  @Prop({ required: true, unique: true })
  bankName: string;
  //银行描述
  @Prop({ default: '' })
  bankDescription: string;
  //银行图片
  @Prop({ default: '' })
  bankImage: string;
}
export type BankDocument = Bank & Document;
export const BankSchema = SchemaFactory.createForClass(Bank);
