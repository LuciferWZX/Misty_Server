import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
@Schema({timestamps: true})
export class Account extends Document {
    @Prop({required:true})
    accountUsername //登录的用户名
    @Prop({required:true})
    accountName:string//显示的名称
    @Prop({required:true})
    accountPassword:string//密码
    @Prop()
    email:string//邮箱
    @Prop()
    phone:string//电话
}
export type AccountDocument = Account & Document
export const AccountSchema = SchemaFactory.createForClass(Account)