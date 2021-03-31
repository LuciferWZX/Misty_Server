export class IdentifyEntity {
  ImageBase64?: string;
  ImageUrl?: string;
  CardSide?: 'FRONT' | 'BACK';
  Config?: string;
  /**
   * 以下可选字段均为bool 类型，默认false： CropIdCard，身
   * 份证照片裁剪（去掉证件外多余的边缘、自动矫正拍摄角度） CropPortrait，
   * 人像照片裁剪（自动抠取身份证头像区域） CopyWarn，复印件告警 BorderCheckWarn，
   * 边框和框内遮挡告警 ReshootWarn，翻拍告警 DetectPsWarn，PS检测告警 TempIdWarn，
   * 临时身份证告警 InvalidDateWarn，身份证有效日期不合法告警 Quality，图片质量分数（评价图片的模糊程度）
   * MultiCardDetect，是否开启多卡证检测
   * ReflectWarn，是否开启反光检测
   SDK 设置方式参考： Config = Json.stringify({"CropIdCard":true,"CropPortrait":true})
   API 3.0 Explorer 设置方式参考： Config = {"CropIdCard":true,"CropPortrait":true}
   */
}
