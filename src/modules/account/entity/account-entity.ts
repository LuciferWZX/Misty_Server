import { Authority } from '../../../utils/type';
import AccountAuthority = Authority.AccountAuthority;
import { Account } from '../../../schemas/account.schema';

export class AccountEntity extends Account {
  accountUsername: string;
  accountNickname: string;
  accountPassword: string;
  email: string;
  phone: string;
  authorityLevel: AccountAuthority;
  token: string;
  authority: {
    id: string;
    name: string;
    description: string;
    level: number;
  };
}
