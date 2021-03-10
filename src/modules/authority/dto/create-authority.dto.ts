import { Authority } from '../../../utils/type';
import AccountAuthority = Authority.AccountAuthority;

export class CreateAuthorityDto {
  authorityName: string; //权限名称
  authorityDescription: string; //权限描述
  authorityLevel: AccountAuthority; //权限等级
}
