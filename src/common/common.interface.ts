export enum ResponseCode {
  success = 0,
  failed = 1,
}
export interface CustomResponse<T> {
  data: T;
  code: ResponseCode;
  message: string;
}
export enum ExceptionStatus {
  CREATE_FAILED = 20000, //注册失败
  NOT_FIND = 20001, //未找到用户
  PASSWORD_ERROR = 20002, //未找到用户
}
