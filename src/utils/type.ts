export namespace Crypt {
  export interface EnCrypt {
    enCryptPassword: string;
    enCryptKey: string;
  }
}
export namespace Authority {
  //权限等级
  export enum AccountAuthority {
    superAdmin,
    admin,
    user,
    reader,
  }
}
export namespace GlobalPrefix {
  export const PREFIX = 'api';
}
