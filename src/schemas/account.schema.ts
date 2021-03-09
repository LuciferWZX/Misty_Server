import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Authority} from "../utils/type";
import AccountAuthority = Authority.AccountAuthority;

@Schema({ collection: 'tb_accounts', timestamps: true })
export class Account extends Document {
  @Prop({ required: true })
  accountUsername: string; //登录的用户名
  @Prop({ required: true })
  accountNickname: string; //显示的名称
  @Prop({ required: true })
  accountPassword: string; //密码
  @Prop()
  email: string; //邮箱
  @Prop()
  phone: string; //电话
  @Prop({required:true,default:AccountAuthority.Level_1})
  authority:AccountAuthority//权限
}
export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
