import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Authority as Auth } from '../utils/type';
import AccountAuthority = Auth.AccountAuthority;

@Schema({
  collection: 'tb_authority',
  timestamps: true,
  id: true,
  versionKey: false,
})
export class Authority extends Document {
  id: string;
  @Prop({ required: true, unique: true })
  authorityName: string;
  @Prop({ default: '' })
  authorityDescription: string;
  @Prop({ required: true, default: AccountAuthority.Level_1, unique: true })
  authorityLevel: AccountAuthority;
}
export type AuthorityDocument = Authority & Document;
export const AuthoritySchema = SchemaFactory.createForClass(Authority);
