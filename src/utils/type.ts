export namespace Crypt {
  export interface EnCrypt {
    enCryptPassword: string;
    enCryptKey: string;
  }
}
export namespace Authority {
  //权限等级
  export enum AccountAuthority {
    Level_0, //最高级
    Level_1, //默认新建账户的权限
    Level_2,
    Level_3, //默认用户的权限
  }
}
