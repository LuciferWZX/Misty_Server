export enum ResponseCode{
    success=0,
    failed=1
}
export interface Response<T> {
    data:T;
    code:ResponseCode,
    message:string
}