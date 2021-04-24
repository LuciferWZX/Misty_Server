import { Authority } from '../../../utils/type';
import AccountAuthority = Authority.AccountAuthority;

export class AccountEntity {
  id: string;
  username: string;
  nickname: string;
  password: string;
  email: string;
  phone: string;
  authorityLevel: AccountAuthority;
  token: string;
  avatar: string;
  authority: {
    id: string;
    name: string;
    description: string;
    level: number;
  };
}
