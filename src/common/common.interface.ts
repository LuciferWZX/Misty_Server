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
  NO_TOKEN = 20003, //没有token
  TOKEN_EXPIRED = 20004,
}

export enum VideoEditStatus {
  finished = 'finished', //以及编辑完成
  processing = 'processing', //尚未完成
}
