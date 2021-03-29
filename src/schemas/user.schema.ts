import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'tb_users',
  timestamps: true,
  autoIndex: true,
  id: true,
  versionKey: false,
})
export class User extends Document {
  id: string;
  //工号
  @Prop({
    unique: true,
    required: true,
    length: [6, '工号长度为6'],
  })
  workId: string;
  //证件照
  @Prop({
    required: true,
    unique: true,
  })
  workerPicture: string;
  //身份证照
  @Prop({
    required: true,
    unique: true,
  })
  idPicture: string;
  //姓名
  @Prop({
    required: true,
    minlength: [2, 'name长度不能小于2'],
    maxlength: [20, 'name长度不能大于20'],
  })
  name: string;
  //身份证号码
  @Prop({
    required: true,
    unique: true,
    maxlength: [18, '身份证号码'],
  })
  idNumber: string;
  //工作种类
  @Prop({
    required: true,
  })
  workCategory: string;
  //银行卡号
  @Prop({
    required: true,
    //minlength: [8, '银行卡号长度不能小于8'],
    maxlength: [25, '银行卡号不能大于35'],
  })
  bankCardNumber: string;
  //工资卡开户银行
  @Prop({
    required: true,
  })
  depositBank: string;
  //联系电话
  @Prop({
    required: true,
    unique: true,
    //minlength: [8, '联系电话长度不能小于8'],
    maxlength: [13, '联系电话长度不能大于15'],
  })
  phone: string;
  //地址
  @Prop({
    required: true,
    minlength: [5, '地址不能小于5'],
    maxlength: [255, '地址不能大于255'],
  })
  address: string;
  //工作技能等级
  @Prop()
  skillLevel: string;
  //备用联系人姓名
  @Prop({
    required: true,
    minlength: [2, '备用联系人姓名不能小于2'],
    maxlength: [20, '备用联系人姓名不能大于20'],
  })
  contactName: string;
  //备用联系人联系电话
  @Prop({
    required: true,
    //minlength: [8, '备用联系人联系电话长度不能小于8'],
    maxlength: [13, '备用联系人联系电话长度不能大于13'],
  })
  contactPhone: string;
  //赡养老人(抵扣计量单位)
  @Prop()
  supportOldUnity: string;
  //赡养老人(抵扣金额)
  @Prop({
    required: false,
  })
  supportOldMoney?: number | undefined;
  //赡养老人(抵扣说明)
  @Prop()
  supportOldDescription: string;
  //抚养小孩(抵扣计量单位)
  @Prop()
  raiseChildrenUnit: string;
  //抚养小孩(抵扣金额)
  @Prop({
    required: false,
  })
  raiseChildrenMoney?: number | undefined;
  //抚养小孩(抵扣说明)
  @Prop()
  raiseChildrenDescription: string;
  //房租/房贷(抵扣计量单位)
  @Prop()
  houseRentUnit: string;
  //房租/房贷(抵扣金额)
  @Prop({
    required: false,
  })
  houseRentMoney?: number | undefined;
  //房租/房贷(抵扣说明)
  @Prop()
  houseRentDescription: string;
  //继续教育(抵扣计量单位)
  @Prop()
  continueEducationUnit: string;
  //继续教育(抵扣金额)
  @Prop({
    required: false,
  })
  continueEducationMoney?: number | undefined;
  //继续教育(抵扣说明)
  @Prop()
  continueEducationDescription: string;
  //创建人的id
  @Prop({
    required: true,
  })
  createdId: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
