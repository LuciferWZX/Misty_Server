export class UserIdCardEntity {
  Name: string; //	姓名（人像面）
  Sex: string; //	性别（人像面）
  Nation: string; //	民族（人像面）
  Birth: string; //	出生日期（人像面）
  Address: string; //	地址（人像面）
  IdNum: string; //	身份证号（人像面）
  Authority: string; //	发证机关（国徽面）
  ValidDate: string; //	证件有效期（国徽面）
  AdvancedInfo: string;
  /**
   * 扩展信息，不请求则不返回，具体输入参考示例3和示例4。
   IdCard，裁剪后身份证照片的base64编码，请求 Config.CropIdCard 时返回；
   Portrait，身份证头像照片的base64编码，请求 Config.CropPortrait 时返回；
   Quality，图片质量分数，请求 Config.Quality 时返回（取值范围：0~100，分数越低越模糊，建议阈值≥50）;
   BorderCodeValue，身份证边框不完整告警阈值分数，请求 Config.BorderCheckWarn时返回（取值范围：0~100，分数越低边框遮挡可能性越低，建议阈值≥50）;
   WarnInfos，告警信息，Code 告警码列表和释义：
   -9100 身份证有效日期不合法告警，
   -9101 身份证边框不完整告警，
   -9102 身份证复印件告警，
   -9103 身份证翻拍告警，
   -9105 身份证框内遮挡告警，
   -9104 临时身份证告警，
   -9106 身份证 PS 告警，
   -9107 身份证反光告警。
   */
}
