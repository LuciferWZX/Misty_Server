export class UserEntity {
  id: string;
  //工号
  workId: string;
  //证件照
  workerPicture: File;
  //身份证照
  idPicture: File;
  //姓名
  name: string;
  //身份证号码
  idNumber: string;
  //工作种类
  workCategory: string;
  //银行卡号
  bankCardNumber: string;
  //工资卡开户银行
  depositBank: string;
  //联系电话
  phone: string;
  //地址
  address: string;
  //工作技能等级
  skillLevel: string;
  //备用联系人姓名
  contactName: string;
  //备用联系人联系电话
  contactPhone: string;
  //赡养老人(抵扣计量单位)
  supportOldUnity: string;
  //赡养老人(抵扣金额)
  supportOldMoney: number;
  //赡养老人(抵扣说明)
  supportOldDescription: string;
  //抚养小孩(抵扣计量单位)
  raiseChildrenUnit: string;
  //抚养小孩(抵扣金额)
  raiseChildrenMoney: number;
  //抚养小孩(抵扣说明)
  raiseChildrenDescription: string;
  //房租/房贷(抵扣计量单位)
  houseRentUnit: string;
  //房租/房贷(抵扣金额)
  houseRentMoney: number;
  //房租/房贷(抵扣说明)
  houseRentDescription: string;
  //继续教育(抵扣计量单位)
  continueEducationUnit: string;
  //继续教育(抵扣金额)
  continueEducationMoney: number;
  //继续教育(抵扣说明)
  continueEducationDescription: string;
  //创建人的id
  createdId?: string;
}
