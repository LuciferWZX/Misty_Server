import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Authority as Auth } from '../utils/type';
import AccountAuthority = Auth.AccountAuthority;

@Schema({
  collection: 'tb_accounts',
  timestamps: true,
  autoIndex: true,
  id: true,
  versionKey: false,
})
export class Account extends Document {
  id: string;
  @Prop({
    required: true,
    unique: true,
    minlength: [2, '用户名长度不能小于2'],
    maxlength: [10, '用户名长度不能大于10'],
  })
  username: string; //登录的用户名
  @Prop({
    required: true,
    unique: true,
    minlength: [2, '昵称长度不能小于2'],
    maxlength: [10, '昵称长度不能大于10'],
  })
  nickname: string; //显示的昵称
  @Prop({ required: true })
  password: string; //密码
  @Prop({ unique: [true, '邮箱重复'] })
  email: string; //邮箱
  @Prop({ unique: [true, '手机重复'] })
  phone: string; //电话
  @Prop({
    default:
      'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1851283359,3457678391&fm=26&gp=0.jpg',
  })
  avatar: string; //头像
  @Prop({ required: true, default: AccountAuthority.user })
  authorityLevel: AccountAuthority; //权限
}
export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);
