import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
@Schema({timestamps: true})
export class Account extends Document {
    @Prop()
    accountName:string
    @Prop({required:true})
    accountPassword:string
    @Prop()
    email:string
    @Prop()
    phone:string
}
export type AccountDocument = Account & Document
export const AccountSchema = SchemaFactory.createForClass(Account)