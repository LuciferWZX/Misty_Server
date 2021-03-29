//文件上传的Bucket名称
export enum TenXunBucket {
  image = 'image-1257846935',
}
//Bucket下一级的文件夹名称
export enum TenXunFileFold {
  user = 'user/',
}
//文件上传地域
export enum TenXunRegion {
  nanJin = 'ap-nanjing',
}
//上传文件的进度
export interface UploadProgressType {
  loaded: number; //已经上传的文件部分大小，以字节（Bytes）为单位
  total: number; //整个文件的大小，以字节（Bytes）为单位
  speed: number; //文件的上传速度，以字节/秒（Bytes/s）为单位
  percent: number; //文件上传的百分比，以小数形式呈现，例如，上传50%即为0.5
}
//上传完成的结果类型
export interface UploadResponseType {
  statusCode: number;
  headers: any;
  Location: string;
  ETag: string;
  RequestId: string;
}
export enum UploadStatus {
  success = 200,
}
