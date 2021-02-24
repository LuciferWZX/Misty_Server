export enum ResponseCode{
    success=0,
    failed=1
}
export interface CustomResponse<T> {
    data:T;
    code:ResponseCode,
    message:string
}
export enum ExceptionStatus{
    CREATE_ACCOUNT_FAILED=20000
}